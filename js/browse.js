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

        // Price accordion has different requirements, so this is a separate function
        if (filter === "tags") {
            populateTagsAccordion(newAccordion, products);
            continue;
        }

        if (filter === "price") {
            populatePriceAccordion(newAccordion, products);
            continue;
        }

        if (filter === "rating") {
            populateRatingAccordion(newAccordion, products);
            continue;
        }

        // Brands and Categories accordions can be filled here
        const attributeItems = getFilterItems(filter, products);
        populateAccordion(newAccordion, attributeItems);
    }
    console.log(accordions);
}

/**
 * 
 * @param {*} accordion Accordion filter object
 * @param {*} attributeItems Attributes that need to be populated 
 * into the accordion. 
 * e.g. accordion can be the accordion representing the brands filter,
 * so the attributeItems list needs to hold every brand we want to be 
 * displayed in that filter.
 */
function populateAccordion(accordion, attributeItems) {
    const ul = accordion.filterList;
    for (const attribute of attributeItems) {
        const li = document.createElement("li");
        li.className = "ml-2";

        const label = document.createElement("label");
        label.className = "flex hover:cursor-pointer text-stone-600";

        const input = document.createElement("input");
        input.type = "checkbox";
        const span = document.createElement("span");
        span.className = "pl-2 text-[16px] text-stone-600";
        span.textContent = attribute;

        label.appendChild(input);
        label.appendChild(span);

        li.appendChild(label);
        ul.appendChild(li);
    }

}

function populatePriceAccordion(accordion, products) {
    let priceRanges = getPriceRanges(products);

    const ul = accordion.filterList;
    for (const price of priceRanges) {
        const li = document.createElement("li");

        const label = document.createElement("label");
        label.className = "flex hover:cursor-pointer";

        const input = document.createElement("input");
        input.type = "checkbox";

        const div = document.createElement("div");
        div.className = "flex w-full items-center justify-between";

        const priceSpan = document.createElement("span");
        priceSpan.className = "pl-2 text-[16px] text-stone-600";
        priceSpan.textContent = price.range;

        const countSpan = document.createElement("span");
        countSpan.className = "pr-2 text-[16px] text-stone-600";
        countSpan.textContent = `(${price.count})`;

        div.appendChild(priceSpan);
        div.appendChild(countSpan);

        label.appendChild(input);
        label.appendChild(div);

        li.appendChild(label);
        ul.appendChild(li);
    }
    /**
    * @brief Gets the list of price ranges that should be used to filter 
    * product prices
    * @return [{range: "", price: Double}]
    */
    function getPriceRanges(products) {
        let price0_10 = 0;
        let price11_25 = 0;
        let price26_50 = 0;
        let price51_100 = 0;
        let price101_500 = 0;
        let price501_up = 0;

        for (const product of products) {
            let price = product.price;
            if (price <= 10) {
                price0_10++;
            } else if (price <= 25) {
                price11_25++;
            } else if (price <= 50) {
                price26_50++;
            } else if (price <= 100) {
                price51_100++;
            } else if (price <= 500) {
                price101_500++;
            } else {
                price501_up++;
            }
        }

        return [{range: "$0 - $10",    count: price0_10},
                {range: "$11 - $25",   count: price11_25},
                {range: "$26 - $50",   count: price26_50},
                {range: "$51 - $100",  count: price51_100},
                {range: "$101 - $500", count: price101_500},
                {range: "$501+",       count: price501_up}];
    }
}

function populateTagsAccordion(accordion, products) {

}

function populateRatingAccordion(accordion, products) {

}

//FUNCTION DOES NOT WORK AS INTENDED
function getFilterItems(attribute, products) {
    // e.g. if filter is "brands" we will grab all brand names 
    // from products and insert them here

    if (attribute === "brands") {
        attribute = "brand";
    }

    if (attribute === "categories") {
        attribute = "category";
    }

    const attributeItems = [];
    for (const product of products) {
        const productKey = product[attribute];
        // If productKey is not undefined and not in the list, add it
        if (!attributeItems.includes(productKey) && productKey) {
            attributeItems.push(productKey);
        }
    }

    return attributeItems;
}

/**
 * @brief Finds the median value of the given list
 * @param {} products list of products
 * @returns median numerical value of the given list
 */
function medianOfList(list) {
    let length = list.length;
    let median;
    if (length % 2 == 0) {
        let low = Math.floor(length / 2);
        let high = Math.ceil(length / 2);
        median = (list[low] + list[high]) / 2;
    }
    median = list[length / 2].price;
    return median;
}

/**
 * TODO: NOT COMPLETED
 * @brief Renders all product cards. Typically used only on initial load 
 * of the Browse view.
 * @param products all product JSON data
 */
function renderAllProducts(products) {
    // Create product cards
    let searchResults = document.querySelector("#search-results");
    for (const product of products) {
        const productCard = createCard();
        searchResults.appendChild(productCard);
    }

    // Add product cards to #search-results
}

function createCard(product) {
    
}