export async function fetchData() {
    // requestData will return a promise so we need to wait 
    const data = await requestData();
    return data;
}

/**
 * Requests the product data from the server
 * From MDN docs fetch API
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 */
async function requestData() {
    const url = "https://dummyjson.com/products?limit=2";
    try {
        const response = await fetch(url);
        // Check if error was 404 not found (other errors will be rejected automatically
        // by await fetch(url))
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error.message);
        return null;
    }
}