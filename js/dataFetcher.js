import { initBrowse } from "./browse.js";

// key to access products in the local storage
const PRODUCTS_STORE_KEY = "products";

export async function fetchData() {
    const data = await requestData();
    return data;
}

function storeData(data) {
    localStorage.removeItem(PRODUCTS_STORE_KEY);
    localStorage.setItem(PRODUCTS_STORE_KEY, JSON.stringify(data));
}

function checkIfSaved() {
    const savedData = localStorage.getItem(PRODUCTS_STORE_KEY);
    if (savedData) {
        return savedData;
    }
    return null;
}

/**
 * Requests the product data from the server
 * From MDN docs fetch API
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
async function requestData() {
    const url = "https://dummyjson.com/products?limit=0";
    try {
        const savedData = checkIfSaved();
        if (savedData) {
            console.log("Returning saved data");
            return (JSON.parse(savedData));
        }

        console.log("Fetching data from server");
        const response = await fetch(url);
        // Check if error was 404 not found (other errors will be rejected automatically
        // by await fetch(url))
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        storeData(result.products);
        return result.products;
    } catch (error) {
        console.error(error.message);
    }
}
