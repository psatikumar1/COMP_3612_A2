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

