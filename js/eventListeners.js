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
    for (let view of views){
        view.classList.add("hidden");
    }

    //Shows the selected page
    const selectedView = document.querySelector(viewSelector);
    selectedView.classList.remove("hidden");
}

//
//---For filters dropdowns on Browse View---
//
export function toggleBrandDropdown() {
    const icon = document.querySelector("#brands-filter-dropdown img");
    const menu = document.querySelector("#brands-dropdown-list");
    toggleDropdown(menu, icon);
}

export function toggleCategoryDropdown() {
    const icon = document.querySelector("#category-filter-dropdown img");
    const menu = document.querySelector("#category-dropdown-list");
    toggleDropdown(menu, icon);
}

export function toggleTagsDropdown() {
    const icon = document.querySelector("#tags-filter-dropdown img");
    const menu = document.querySelector("#tags-dropdown-list");
    toggleDropdown(menu, icon)
}

export function togglePriceDropdown() {
    const icon = document.querySelector("#price-filter-dropdown img");
    const menu = document.querySelector("#price-dropdown-list");
    toggleDropdown(menu, icon);
}

export function toggleRatingDropdown() {
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

