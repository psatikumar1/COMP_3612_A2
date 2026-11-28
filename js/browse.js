import { Accordion } from "./accordion.js";
import { fetchData } from "./dataFetcher.js";

// List of objects given by the filter dataset
// i.e. accordions = { brands: [], categories: []...}
let accordions = {};
// [{brands: [brand1, brand2, brand3]}]
let selectedFilters = {brands: [],
                       category: [],
                       tags: [],
                       price: [], // {rangeStr: str, low: number, high: number}
                       rating: []};
const priceRanges = 
    [{range: "$0 - $10",    low: 0,   high: 10},
     {range: "$10 - $25",   low: 10,  high: 25},
     {range: "$25 - $50",   low: 25,  high: 50},
     {range: "$50 - $100",  low: 50,  high: 100},
     {range: "$100 - $500", low: 100, high: 500},
     {range: "$500+",       low: 500, high: Number.MAX_SAFE_INTEGER}
    ];

export async function initBrowse() { 
    const products = await fetchData();

    showProducts(products);
    // remove old stuff (if it exists)
    for (const idx in accordions) {
        accordions[idx].destroy();
        delete accordions[idx];
    }

    installBrowseAccordions(products);
    installFilterEvents(products);
}

function installFilterEvents(products) {
    // add to selectedFilters list
    const filter = document.querySelector("#filter");
    filter.addEventListener("change", (e) => {
        const type = e.target.dataset.filterChecked;
        const name = e.target.dataset.attributeName;
        const list = selectedFilters[type];
        
        if (e.target.checked) {
            if (type === "price") {

                const range = priceRanges.find(r => r.range === name);
                if (range && !list.includes(range)) {
                    list.push(range);
                }

            } else if (!list.includes(name)) {
                console.log(name);
                list.push(name);
            }

        } else {
            selectedFilters[type] = list.filter(filterItem => 
                (type === "price" ? filterItem.range : filterItem) !== name);
        }
        updateProductsShowing(products);
    });
    // detect change and show the "reset filters" button
}

function updateProductsShowing(products) {
    const {brands, category, tags, price, rating} = selectedFilters;

    const visibleProducts = products.filter(product => {
        // if the length of any list is empty, we show all since no selection does not mean
        // "show none"
        const showBrand = brands.length == 0 || 
            (brands.includes(product.brand));
        
        const showCategory = category.length == 0 ||
            (product.category && category.includes(product.category));
        
        const showTags = tags.length == 0 ||
            product.tags.some(tag => tags.includes((tag)));
        
        const showPrice = price.length == 0 ||
            price.some(range => inPriceRange(product.price, range));
        
        // rating is actually a string here from the JSON data so we need to parse into int
        const showRating = rating.length == 0 ||
            rating.some(rating => Math.floor(product.rating) === parseInt(rating)) ||
            product.rating > 4; // floor will bring a rating of 4.9 down to 4, so anything > 4 && <= 5 won't be showns
        
        return showBrand && showCategory && showTags && showPrice && showRating;
    });
    console.log(selectedFilters);

    showProducts(visibleProducts);
}

function showProducts(visibleProducts) {
    console.log(`Displaying: ${visibleProducts.length} products`);

    const searchResults = document.querySelector("#search-results");
    searchResults.innerHTML = "";
    for (const product of visibleProducts) {
        const productCard = createCard(product);
        searchResults.appendChild(productCard);
    }
}

function createCard(product) {
    const productCard = document.createElement("div");
    productCard.className = "product-card w-full h-max flex flex-col items-center";
    
    const productCardBtn = createCardButton(product); 

    // add to cart button
    const addToCartBtn = document.createElement("button");
    addToCartBtn.className = "add-to-cart-btn my-1.5 bg-stone-800 rounded-md w-full text-white text-[16px] font-semibold py-1.5 hover:cursor-pointer hover:bg-stone-700";
    addToCartBtn.dataset.productID = product.id;
    addToCartBtn.textContent = "Add to Cart";

    productCard.append(productCardBtn, addToCartBtn);
    return productCard;
}

function createCardButton(product) {
    const cardButton = document.createElement("div");

    cardButton.className = "product-card-button w-full";
    
    const productCardImgContainer = document.createElement("div");
    productCardImgContainer.className = "product-card-img bg-stone-200 hover:cursor-pointer aspect-square";
    const img = document.createElement("img");
    img.className = "w-full";
    img.src = product.thumbnail;
    productCardImgContainer.appendChild(img);

    const productInfoContainer = document.createElement("div");
    productInfoContainer.className = "product-info text-left grid gap-1 mt-2";
    const a = document.createElement("a");
    a.className = "hover:cursor-pointer hover:underline text-[16px] grid gap-1";
    const brand = document.createElement("h2");
    brand.className = "product-card-brand font-semibold";
    brand.textContent = getBrand(product);
    const prodName = document.createElement("h3");
    prodName.className = "product-card-name";
    prodName.textContent = product.title;
    a.append(brand, prodName);
    
    const productPriceContainer = document.createElement("div");
    productPriceContainer.className = "product-card-price flex flex-wrap gap-2";
    const ogPrice = document.createElement("p");
    ogPrice.className = "original-product-price strikethrough";
    const priceText = document.createElement("s"); 
    priceText.textContent = `$${Math.round(product.price * 100) / 100}`;
    ogPrice.appendChild(priceText);
    const discPrice = document.createElement("p");
    discPrice.className = "discounted-product-price text-red-800";
    discPrice.textContent = `$${discountedPrice(product.price, product.discountPercentage)}`;
    const percentDisc = document.createElement("p");
    percentDisc.className = "percent-discount text-red-800";
    percentDisc.textContent = `(${product.discountPercentage}% off)`;
    productPriceContainer.append(ogPrice, discPrice, percentDisc);

    productInfoContainer.append(a, productPriceContainer);

    cardButton.append(productCardImgContainer, productInfoContainer);

    return cardButton;
}

function getBrand(product) {
    if (product.category === "groceries") {
        return "Grocery";
    }
    if (!product.brand) {
        return sanitizeAttribute(product.category);
    }
    return product.brand;
}

function inPriceRange(price, range) {
    return price > range.low && price <= range.high;
}

function discountedPrice(price, discount) {
    discount = discount / 100;
    return Math.round(price * discount * 100) / 100;
}

function installBrowseAccordions(products) {
    const filterAccordions = document.querySelectorAll(".filter-accordion");

    for (const accordion of filterAccordions) {
        const newAccordion = new Accordion(accordion);

        const filter = accordion.dataset.filter;
        
        if (!accordions[filter]) {
            accordions[filter] = [];
        }

        accordions[filter] = newAccordion;

        if (filter == "brands") {
            populateBrandsAccordion(newAccordion, products);
            continue;
        }

        if (filter == "categories") {
            populateCategoriesAccordion(newAccordion, products);
            continue;
        }

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
    }
}

function populateBrandsAccordion(accordion, products) {
    const brands = getBrands(products);
    const ul = accordion.filterList;
    for (let brand of brands) {
        brand = sanitizeAttribute(brand);
        const li = createListElement("brands", brand);
        ul.append(li);
    }

    function getBrands() {
        let brandList = [];
        for (const product of products) {
            if (product.brand && !brandList.includes(product.brand)) {
                brandList.push(product.brand);
            } 
        }
        return brandList;
    }

}

function populateCategoriesAccordion(accordion, products) {
    const categories = getCategories(products);
    const ul = accordion.filterList;
    for (let category of categories) {
        category = sanitizeAttribute(category);
        const li = createListElement("category", category);
        ul.append(li);
    }

    function getCategories() {
        let categoriesList = [];
        for (const product of products) {
            if (product.category && !categoriesList.includes(product.category)) {
                categoriesList.push(product.category);
            }
        }
        return categoriesList;
    }
}

/**
 * @brief Populates the price filter accordion
 * @param {*} accordion 
 * @param {*} products 
 */
function populatePriceAccordion(accordion, products) {
    let priceCounts = getPriceRanges(products);

    const ul = accordion.filterList;
    let idx = 0;
    for (const price of priceRanges) {
        const li = document.createElement("li");

        const label = document.createElement("label");
        label.className = "flex hover:cursor-pointer";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.dataset.filterChecked = "price";
        input.dataset.attributeName = price.range;

        const div = document.createElement("div");
        div.className = "flex w-full items-center justify-between";

        const priceSpan = document.createElement("span");
        priceSpan.className = "pl-2 text-[16px] text-stone-800";
        priceSpan.textContent = price.range;

        const countSpan = document.createElement("span");
        countSpan.className = "pr-2 text-[16px] text-stone-800";
        countSpan.textContent = `(${priceCounts[idx]})`;

        div.appendChild(priceSpan);
        div.appendChild(countSpan);

        label.appendChild(input);
        label.appendChild(div);

        li.appendChild(label);
        ul.appendChild(li);

        idx++;
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

        return [price0_10,
                price11_25,
                price26_50,
                price51_100,
                price101_500,
                price501_up];
    }
}

/**
 * @brief Populates the tags filter accordion
 * @param {*} newAccordion 
 * @param {*} products 
 */
function populateTagsAccordion(accordion, products) {
    let tags = getTags(products);
    const ul = accordion.filterList;
    for (const tag of tags) {
        const li = document.createElement("li");
        li.className = "ml-2";

        const label = document.createElement("li");
        label.className = "flex hover:cursor-pointer";
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.dataset.attributeName = tag;
        input.dataset.filterChecked = "tags";

        const span = document.createElement("span");
        span.className = "pl-2 text-[16px] text-stone-800";
        span.textContent = tag;

        label.append(input, span);
        li.append(label);
        ul.append(li);
    }
    
    function getTags(products) {
        let tagList = [];
        for (const product of products) {
            const productTags = product.tags;
            for (let tag of productTags) {
                // make sure the first letter is capitalized
                tag = tag.charAt(0).toUpperCase() + tag.slice(1);
                if (!tagList.includes(tag)) {
                    tagList.push(tag);
                }
            }
        }
        return tagList;
    }

}

function populateRatingAccordion(accordion, products) {
    const ul = accordion.filterList;

    for (let i = 0; i < 5; i++) {
        const li = document.createElement("li");
        li.className = "ml-2";

        const label = document.createElement("label");
        label.className = "flex hover:cursor-pointer";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.dataset.attributeName = `${i + 1}stars`;
        input.dataset.filterChecked = "rating";
        input.dataset.starRating = i + 1;

        const stars = getNumStars(i + 1);

        label.append(input, stars);
        li.append(label);
        ul.append(li);
    }

    function getNumStars(numStars) {
        const span = document.createElement("span");
        span.className = "ml-1 flex gap-[0.5]";
        for (let i = 1; i < numStars + 1; i++) {
            const img = document.createElement("img");
            img.src = "../assets/star_rate.svg";
            img.className = "w-5 h-5";
            span.append(img);
        }
        return span;
    }
}

function sanitizeAttribute(attribute) {
    let sanitizedAttribute = attribute.replace('-', ' ');
    sanitizedAttribute = sanitizedAttribute.charAt(0).toUpperCase() + sanitizedAttribute.slice(1);        
    return sanitizedAttribute;
}

function createListElement(filterCategory, attribute) {
    const li = document.createElement("li");
    li.className = "ml-2";

    const label = document.createElement("label");
    label.className = "flex hover:cursor-pointer";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.filterChecked = filterCategory;
    input.dataset.attributeName = attribute;
    const span = document.createElement("span");
    span.className = "pl-2 text-[16px]";
    span.textContent = attribute;

    label.append(input, span);
    li.append(label);
    
    return li;
}