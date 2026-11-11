//
//---Get the pages to switch between views
//
const homeButton = document.querySelector("#home-view-btn");
const logoButton = document.querySelector("#logo-button");
const browseButton = document.querySelector("#browse-view-btn");
const categoryButton = document.querySelector("#category-view-btn");
const cartButton = document.querySelector("#cart-view");

homeButton.addEventListener("click", showHome);
logoButton.addEventListener("click", showHome);
browseButton.addEventListener("click", showBrowse);
categoryButton.addEventListener("click", showCategory);
cartButton.addEventListener("click", showCart);