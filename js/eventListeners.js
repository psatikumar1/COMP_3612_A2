import { Accordion } from "./accordion.js";
import { ViewManager } from "./viewManager.js";
import { fetchData } from "./dataFetcher.js";
import { fetchProduct } from "./dataFetcher.js";


/**
 * Moved this to flobal so that it can also be accessed by openHomeProduct()
 */
const views = new ViewManager({
    home: { id: "#home", title: "COMP3612 Store" },
    browse: { id: "#browse", title: "COMP3612 - Browse Products" },
    category: { id: "#category", title: "COMP3612 - Shop by Category" },
    cart: { id: "#cart", title: "COMP3612 - Shopping Cart"},
    product: {id: "#single-product", title: "COMP3612 - Product Details"}
});

/**
 * 5 categories that contain 11 subcategories 
 */
const categoryGroups = {
    home:[
            {name: "Furniture", category: "furniture"},
            {name: "Home Decoration", category: "home-decoration"},
            {name: "Kitchen Accessories", category: "kitchen-accessories"}
    ],
    mens:[
            {name: "Mens Shirts", category: "mens-shirts"},
            {name: "Mens Shoes", category: "mens-shoes"},
            {name: "Mens Watches", category: "mens-watches"}
    ],
    tech: [
            {name: "Laptops", category: "laptops"},
            {name: "Mobile Accessories", category: "mobile-accessories"}
    ],
    groceries:[
        {name: "Groceries", category: "groceries"}
    ],
    "cosmetics-personal-care":[
            {name: "Beauty", category: "beauty"},
            {name: "Fragrances", category: "fragrances"}
    ]
};
//To keep track of the latest click. If a button is clicked immediately after another, 
// this keeps track and makes sure only contents of the 2nd click are displayed
let categoryRequestNumber = 0; 

/**
 * Connect the 5 parent buttons and create their subcategory if need be
 */
export function installCategoryEventListeners(){
    const buttons = document.querySelectorAll("#category [data-category]");
    for (let button of buttons){
        button.addEventListener("click", toggleCategory);
        button.classList.add("w-full");

        const image = button.querySelector("img");
        image.className = "h-36 w-full object-contain"; //Give parent cateogry a consistent size in their cell

        const group = categoryGroups[button.dataset.category];
        
        if(group.length > 1){ //If there are any subcategories in the card
            createSubCategoryList(button, group);
        }
    }
}



/**
 * Adds subcategory boxs below the parent cateogry
 */
function createSubCategoryList(parentButton, group){
    const list = document.createElement("ul");
    list.className = "subcategory-list hidden mt-4 grid gap-2 rounded-md border border-amber-200 bg-white p-4 shadow-md";

    for(let subcategory of group){
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.category = subcategory.category;
        button.textContent = subcategory.name;
        button.className = "subcategory-option rounded-md hover:bg-amber-100";
        button.addEventListener("click", openSubcategory);

        item.appendChild(button);
        list.appendChild(item);
    }

    const parentCard = parentButton.parentElement;
    parentCard.appendChild(list);
}

/**
 * Open or close the parent category box if needed
 */
function toggleCategory(event){
    const button = event.currentTarget;
    const group = categoryGroups[button.dataset.category];

    if(group.length === 1){ //If Groceries is clicked
        closeSubcategories();
        openCategoryProducts(group[0].category, group[0].name);
        return;
    }

    //Toggle the subcategory list if it is already open or closed
    const parentCard = button.parentElement;
    const list = parentCard.querySelector(".subcategory-list");
    const wasHidden = list.classList.contains("hidden");
    closeSubcategories();
    if(wasHidden){
        list.classList.remove("hidden");
    }
}

function closeSubcategories(){
    const lists = document.querySelectorAll(".subcategory-list");
    for (let list of lists){
        list.classList.add("hidden");
    }   
}

function openSubcategory(event){
    const button = event.currentTarget;
    openCategoryProducts(button.dataset.category, button.textContent);
}

/**
 * Finds products belonging to subcategory
 */
async function openCategoryProducts(category, categoryName){
    const data = await fetchData();
    const categoryView = document.querySelector("#category");
    if(categoryView.classList.contains("hidden")){
        return;
    }

    if (data == null){
        alert("Products could not be loaded");
        return;
    }

    const products = [];
    for(let product of data.products){
        if(product.category === category){
            products.push(product);
        }
    }

    displayBrowseProducts(products, categoryName);
    views.showView("browse");
}


/**
 * Show the selected category products in the Browse view
 */
function displayBrowseProducts(products, categoryName){

    //Clear the previous results and filters
    const results = document.querySelector("#search-results");
    results.textContent = "";
    const filter = document.querySelector("#selected-filters ul");
    filter.textContent = "";
    
    //Display the selected category name in the filter section
    const label = document.createElement("li");
    label.textContent = categoryName;
    label.className = "border border-amber-200 bg-amber-100 px-2 py-1";
    filter.appendChild(label);

    const sortOrder = document.querySelector("#sort-order-dropdown");
    sortOrder.value = "P-Name_AZ";

    for(let product of products){
        const card = createBrowseProductCard(product);
        results.appendChild(card);
    }
}

/**
 * Creates a product card in the Browse page
 */
function createBrowseProductCard(product){
    const card = document.createElement("article");
    card.className = "product-card bg-white p-3";

    const link = document.createElement("a");
    link.href = "#single-product";
    link.dataset.productId = product.id;
    link.className = "block hover:underline";
    link.addEventListener("click", openHomeProduct);

    const image = document.createElement("img");
    image.src = product.thumbnail;
    image.alt = product.title;
    image.className = "mb-2 h-48 w-full object-contain";

    const title = document.createElement("h3");
    title.textContent = product.title;
    title.className = "mb-1 text-lg font-semibold text-amber-900";

    const price = document.createElement("p");
    price.textContent = "$" + product.price.toFixed(2);
    price.className = "text-amber-900 mt-2";

    link.appendChild(image);
    link.appendChild(title);
    link.appendChild(price);
    card.appendChild(link);

    return card;
}



/**
 * Installs event listeners for the view selector buttons on the page
 */
export function installHeaderEventListeners() {

    
    const viewButtons = document.querySelectorAll("[data-view]");
    for (let viewButton of viewButtons) {
        viewButton.addEventListener("click", () => views.showView(viewButton.dataset.view));
    }

    // About is a dialog so it needs its own handlers
    handleAboutButton();
}



/**
 * COnnect the home product card and the product detail buttons
 * to the functions that are called when clicked
 */
export function installHomeProductEventListeners(){
    const card = document.querySelector("#home .product-card-button");
    card.addEventListener("click", openHomeProduct); 
}

/** 
 * Load and display the clicked home product 
 */
async function openHomeProduct(event){
    event.preventDefault();

    const card = event.currentTarget;
    const productId = card.dataset.productId;
    //wait for APi to return with the data
    const product = await fetchProduct(productId);//https://www.w3schools.com/js/js_async_await.asp

    const home = document.querySelector("#home");

    //If a request fails
    if (product == null){
        alert("product couldnt be loaded");
        return;
    }

    displayProduct(product);
    views.showView("product");
    document.title = product.title;
}

/**
 * Displays the details of a product on the page
 * 
 */
function displayProduct(product){
    setProductText(".product-title", product.title);
    setProductText(".product-description", product.description);
    setProductText(".product-price", "$" + product.price.toFixed(2));
    setProductText(".product-category", product.category);
    setProductText(".product-breadcrumb-title", product.title);
    setProductText(".product-sku", product.sku);
    setProductText(".product-stock", product.availabilityStatus);

    const stars = getStars(product.rating);
    setProductText(".product-rating", stars + " " + product.rating + " / 5");

    const image = document.querySelector(".product-image");
    image.src = product.images[0];
    image.alt = product.title;

    const quantity = document.querySelector(".product-quantity");
    quantity.value = 1;

    displayProductTags(product.tags);
    displayProductSpecifications(product);
    displayProductReviews(product.reviews);
    //showSpecifications();
}

/** 
 *  Sets the text content of a product element on the page 
 */
function setProductText(selector, text){
    const element = document.querySelector(selector);
    element.textContent = text;
}


/**
 * Generates star icons based on product rating
 */
function getStars(rating){
    let stars = "";
    const roundedRating = Math.round(rating);
    for (let number = 1; number <=5; number++){
        if (number <= roundedRating){
            stars += "★";
        } else {
            stars += "☆";
        }
    }
    return stars;
}

/**
 * Displays the product tags on the page 
 */
function displayProductTags(tags){
    const list = document.querySelector(".product-tags");
    list.textContent = "";

    for(const tag of tags){
        const item = document.createElement("li");
        item.textContent = tag;
        item.className = "border border-amber-200 bg-amber-100 px-2 py-1";
        list .appendChild(item);
    }
}

/**
 * Displays the product specifications on the page
 */
function displayProductSpecifications(product){
    const list = document.querySelector(".product-specifications-list");
    list.textContent = "";

    const specifications = [
        "Weight: " + product.weight,
        "Width: " + product.dimensions.width,
        "Height: " + product.dimensions.height,
        "Depth: " + product.dimensions.depth,
        "Warranty: " + product.warrantyInformation,
        "Shipping: " + product.shippingInformation,
        "Returns: " + product.returnPolicy
    ];

    for(const spec of specifications){
        const item = document.createElement("li");
        item.textContent = spec;
        item.className = "mb-2";
        list.appendChild(item);
    }
}

/**
 * Displays the product reviews on the page
 */
function displayProductReviews(reviews){
    const list = document.querySelector(".product-reviews-list");
    list.textContent = "";

    for (const review of reviews){
        const item = document.createElement("li");
        item.className = "mb-4 border-b border-gray-300 pb-2";

        const name = document.createElement("p");
        name.textContent = review.reviewerName;
        name.className = "font-semibold";
        
        const rating = document.createElement("p");
        rating.textContent = getStars(review.rating);
        rating.className = "text-amber-800";

        const date = document.createElement("p");
        date.textContent = review.date;
        date.className = "mb-2 text-sm text-stone-600";

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        item.appendChild(name);
        item.appendChild(rating);
        item.appendChild(date);
        item.appendChild(comment);

        list.appendChild(item);
    }
}

/**
 * Sets the event listeners for the filter accordions on the Browse view.
 */
export function installBrowseAccordionEventListeners() {
    const accordionNodes = document.querySelectorAll(".filter-accordion");
    let accordions = [];
    for (let accordion of accordionNodes) {
        accordions.push(new Accordion(accordion));
    }
    return accordions;
}

/**
 * Looking at DOM events to see what I can target for detecting
 * the Browse view being enabled so we can start feching data.
 * https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Events
 * This is directly from the MDN example https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 * and I have modified it to suit our needs. 
 */
export function installDataFetcher() {
    const browseView = document.querySelector("#browse");
    
    // Only need to observe the attributes list (looking for class attribute change)
    const config = { attributes: true };

    // Callback when "hidden" attribute disappears from the browse classlist
    let dataFetched = false;
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            // If the mutation was to hide the Browse view immediately exit
            if (browseView.classList.contains("hidden")) {
                break;
            }

            // If the data has already been fetched immediately exit
            if (dataFetched) {
                break;
            }

            // Now we can fetch the data
            dataFetched = true;
            return fetchData();
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(browseView, config);
}

//
//---For toggling the About popup---
//
function handleAboutButton() {
    // Handle about button separately since it is a dialog
    const aboutBtns = document.querySelectorAll(".about-button");
    for (let button of aboutBtns) {
        button.addEventListener("click", openAbout);
    }
    const aboutClose = document.querySelector(".about-close");
    aboutClose.addEventListener("click", closeAbout);
}

function openAbout(){
    const aboutDialog = document.querySelector(".about-dialog") //https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
    aboutDialog.showModal();
}

function closeAbout(){
    const aboutDialog = document.querySelector(".about-dialog")
    aboutDialog.close();
}

