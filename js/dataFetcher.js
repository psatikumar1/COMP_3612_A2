// key to access products in the local storage
const PRODUCTS_STORE_KEY = "products";

export function fetchData() {
    requestData();
}

// async function loadProductData() {
//     // Check if the data is already saved
//     const savedData = localStorage.getItem(PRODUCTS_STORE_KEY);
//     // Return if saved
//     if (savedData) {
//         try {
//             console.log("Returning saved data");
//             return JSON.parse(savedData);
//         } catch (error) {
//             // Something is wrong with the data. Should re-fetch it
//             console.error("Saved data error. Re-fetching...");
//             localStorage.removeItem(PRODUCTS_STORE_KEY); 
//         }
//     }
    
//     // If not saved or has an error, fetch it
//     try {
//         const data = await requestData();
//         // Store the new data in localstorage
//         localStorage.setItem(PRODUCTS_STORE_KEY, JSON.stringify(data.products));
//     } catch (error) {
//         console.error(error);
//     }
    
//     return null;
// }

function storeData(data) {
    localStorage.removeItem(PRODUCTS_STORE_KEY);
    localStorage.setItem(PRODUCTS_STORE_KEY, JSON.stringify(data));
}

function checkIfSaved() {
    const savedData = localStorage.getItem(PRODUCTS_STORE_KEY);
    if (savedData) {
        return true;
    }
    return false;
}

/**
 * Requests the product data from the server
 * From MDN docs fetch API
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
async function requestData() {
    const url = "https://dummyjson.com/products?limit=1";
    try {
        if (checkIfSaved()) {
            return;
        }

        const response = await fetch(url);
        // Check if error was 404 not found (other errors will be rejected automatically
        // by await fetch(url))
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        storeData(result.products);
    } catch (error) {
        console.error(error.message);
    }
}