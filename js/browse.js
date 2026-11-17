import { Accordion } from "./accordion.js";

// List of objects given by the filter dataset
// i.e. accordions = { brands: [], categories: []...}
const accordions = {};

export function initBrowse(products) {
    renderAllProducts(products);
    buildFilterLists(products);
}

export function installBrowseAccordions() {
    const filterAccordions = document.querySelectorAll(".filter-accordion");
    for (const accordion of filterAccordions) {
        accordions[accordion.dataset.filter] = new Accordion(accordion);
    }
}

/**
 * 
 * @param products all product data
 */
function renderAllProducts(products) {
    // Create product cards
    const searchResults = document.querySelector("#search-results");
    for (const product of products) {
        const productCard = createCard();
        searchResults.appendChild(productCard);
    }

    // Add product cards to #search-results
}

function createCard(product) {

}

function buildFilterLists(products) {
    // Build brand filter accordion
    // Build category filter accordion
    // Build tag filter accordion
    // Build price filter accordion
    // Build rating filter accordion
}