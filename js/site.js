import * as EventListeners from "./eventListeners.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    setHeaderEventListeners();
    setBrowseFilterEventListeners();
}

/**
 * Installs event listeners for the view selector buttons on the page
 */
function setHeaderEventListeners() {
    const homeButton = document.querySelector("#home-view-btn");
    const logoButton = document.querySelector("#logo-btn");
    const browseButton = document.querySelector("#browse-view-btn");
    const categoryButton = document.querySelector("#category-view-btn");
    const cartButton = document.querySelector("#cart-view-btn");

    homeButton.addEventListener("click", EventListeners.showHome);
    logoButton.addEventListener("click", EventListeners.showHome);
    browseButton.addEventListener("click", EventListeners.showBrowse);
    categoryButton.addEventListener("click", EventListeners.showCategory);
    cartButton.addEventListener("click", EventListeners.showCart);
}

/**
 * Sets the event listeneres for the filter accordions on the Browse view.
 */
function setBrowseFilterEventListeners() {
    const brandDropdownBtn = document.querySelector("#brands-filter-dropdown");
    const categoryDropdownBtn = document.querySelector("#category-filter-dropdown");
    const tagsDropdownBtn = document.querySelector("#tags-filter-dropdown");
    const priceDropdownBtn = document.querySelector("#price-filter-dropdown");
    const ratingDropdownBtn = document.querySelector("#rating-filter-dropdown");

    brandDropdownBtn.addEventListener("click", EventListeners.toggleBrandDropdown);
    categoryDropdownBtn.addEventListener("click", EventListeners.toggleCategoryDropdown);
    tagsDropdownBtn.addEventListener("click", EventListeners.toggleTagsDropdown);
    priceDropdownBtn.addEventListener("click", EventListeners.togglePriceDropdown);
    ratingDropdownBtn.addEventListener("click", EventListeners.toggleRatingDropdown);
}