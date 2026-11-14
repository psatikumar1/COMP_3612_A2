/**
 * Installs event listeners for the view selector buttons on the page
 */
export function setHeaderEventListeners() {
    const homeButton = document.querySelector("#home-view-btn");
    const logoButton = document.querySelector("#logo-btn");
    const browseButton = document.querySelector("#browse-view-btn");
    const categoryButton = document.querySelector("#category-view-btn");
    const cartButton = document.querySelector("#cart-view-btn");

    homeButton.addEventListener("click", showHome);
    logoButton.addEventListener("click", showHome);
    browseButton.addEventListener("click", showBrowse);
    categoryButton.addEventListener("click", showCategory);
    cartButton.addEventListener("click", showCart);
}
//
//---For helping to swtich between page views---
//
export function showHome(){
    showView("#home");
}

export function showBrowse(){
    showView("#browse");
}

export function showCategory(){
    showView("#category");
}

export function showCart(){
    showView("#cart");
}

function showView(viewSelector) {
    const views = document.querySelectorAll(".page-view");

    //Hides all pages
    for (let view of views) {
        view.classList.add("hidden");
    }

    //Shows the selected page
    const selectedView = document.querySelector(viewSelector);
    selectedView.classList.remove("hidden");
}

/**
 * Sets the event listeneres for the filter accordions on the Browse view.
 */
export function setBrowseFilterEventListeners() {
    const brandDropdownBtn = document.querySelector("#brands-filter-dropdown");
    const categoryDropdownBtn = document.querySelector("#category-filter-dropdown");
    const tagsDropdownBtn = document.querySelector("#tags-filter-dropdown");
    const priceDropdownBtn = document.querySelector("#price-filter-dropdown");
    const ratingDropdownBtn = document.querySelector("#rating-filter-dropdown");

    brandDropdownBtn.addEventListener("click", toggleBrandDropdown);
    categoryDropdownBtn.addEventListener("click", toggleCategoryDropdown);
    tagsDropdownBtn.addEventListener("click", toggleTagsDropdown);
    priceDropdownBtn.addEventListener("click", togglePriceDropdown);
    ratingDropdownBtn.addEventListener("click", toggleRatingDropdown);
}
//
//---For filters dropdowns on Browse View---
//
function toggleBrandDropdown() {
    const icon = document.querySelector("#brands-filter-dropdown img");
    const menu = document.querySelector("#brands-dropdown-list");
    toggleDropdown(menu, icon);
}

function toggleCategoryDropdown() {
    const icon = document.querySelector("#category-filter-dropdown img");
    const menu = document.querySelector("#category-dropdown-list");
    toggleDropdown(menu, icon);
}

function toggleTagsDropdown() {
    const icon = document.querySelector("#tags-filter-dropdown img");
    const menu = document.querySelector("#tags-dropdown-list");
    toggleDropdown(menu, icon);
}

function togglePriceDropdown() {
    const icon = document.querySelector("#price-filter-dropdown img");
    const menu = document.querySelector("#price-dropdown-list");
    toggleDropdown(menu, icon);
}

function toggleRatingDropdown() {
    const icon = document.querySelector("#rating-filter-dropdown img");
    const menu = document.querySelector("#rating-dropdown-list");
    toggleDropdown(menu, icon);
}

function toggleDropdown(dropdownMenu, dropdownIcon) {
    const isClosed = !(dropdownMenu.classList.contains("hidden"));
    
    dropdownIcon.classList.toggle("rotate-90", isClosed);

    if (isClosed) {
        dropdownMenu.classList.add("hidden");
    } else {
        dropdownMenu.classList.remove("hidden");
    }
}

//
//---For toggling the About popup---
//
export function openAbout(){
    const aboutDialog = document.querySelector(".about-dialog") //https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
    aboutDialog.showModal();
}

export function closeAbout(){
    const aboutDialog = document.querySelector(".about-dialog")
    aboutDialog.close();
}

