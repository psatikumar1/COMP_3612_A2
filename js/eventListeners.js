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

    const specificationsButton = document.querySelector(".specifications-button");
    const reviewsButton = document.querySelector(".reviews-button");
    specificationsButton.addEventListener("click", showSpecifications);
    reviewsButton.addEventListener("click", showReviews);
}

function showSpecifications(){
    const specifications = document.querySelector(".product-specifications");
    const reviews = document.querySelector(".product-reviews");
    specifications.classList.remove("hidden");
    reviews.classList.add("hidden");
}


function showReviews(){
    const specifications = document.querySelector(".product-specifications");
    const reviews = document.querySelector(".product-reviews");
    specifications.classList.add("hidden");
    reviews.classList.remove("hidden");
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
    showSpecifications();
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

