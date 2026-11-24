import { Accordion } from "./accordion.js";
import { fetchData } from "./dataFetcher.js";

// List of objects given by the filter dataset
// i.e. accordions = { brands: [], categories: []...}
const accordions = {};

export async function initBrowse() {
    const products = await fetchData(); 
    installBrowseAccordions(products);
    //renderAllProducts(products);
}

function installBrowseAccordions(products) {
    const filterAccordions = document.querySelectorAll(".filter-accordion");
    for (const accordion of filterAccordions) {
        const newAccordion = new Accordion(accordion);
        
        const filter = accordion.dataset.filter;
        if (!accordions[filter]) {
            accordions[filter] = [];
        }
        accordions[filter].push(newAccordion);

        // Now need to populate the accordion with appropriate filters
        const attributeItems = getFilterItems(filter, products);

        populateAccordion(newAccordion, attributeItems);
    }
}

function populateAccordion(accordion, attributeItems) {
    const ul = accordion.filterList;
    for (const attribute in attributeItems) {
        console.log(attribute);
        const li = document.createElement("li");
        li.classList = "ml-2";

        const label = document.createElement("label");
        label.classList = "flex hover:cursor-pointer";

        const input = document.createElement("input");
        input.type = "checkbox";
        const span = document.createElement("span");
        span.classList = "pl-2 text-[16px]";
        span.textContent = attribute;

        label.appendChild(input);
        label.appendChild(span);

        li.appendChild(label);
        ul.appendChild(li);
    }

}

//FUNCTION DOES NOT WORK AS INTENDED
function getFilterItems(attribute, products) {
    // e.g. if filter is "brands" we will grab all brand names 
    // from products and insert them here
    if (attribute === "brands") {
        attribute = attribute.slice(0, -1);
    }

    if (attribute === "categories") {
        attribute = "category";
    }

    if (attribute === "price") {
        return getPriceRanges(products);
    }

    const attributeItems = [];
    // NOTE: THIS IS NOT WORKING
    console.log(`Attribute being targeted: ${attribute}`);
    for (const product of products) {
        const productKey = product[attribute];
        if (!attributeItems.includes(productKey)) {
            console.log(productKey);
            attributeItems.push(productKey);
        }
    }

    return attributeItems;
}

function getPriceRanges(products) {
    let low = products[0].price;
    let high = low;

    for (const product of products) {
        if (product.price < low) {
            low = product.price;            
        }

        if (product.price > high) {
            high = product.price;
        }
    }

    return [low, high];
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