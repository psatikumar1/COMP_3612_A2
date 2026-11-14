import { Accordion } from "./accordion.js";
import { ViewManager } from "./viewManager.js";

/**
 * Installs event listeners for the view selector buttons on the page
 */
export function installHeaderEventListeners() {
    const views = new ViewManager({
        home: { id: "#home", title: "COMP3612 Store" },
        browse: { id: "#browse", title: "COMP3612 - Browse Products" },
        category: { id: "#category", title: "COMP3612 - Shop by Category" },
        cart: { id: "#cart", title: "COMP3612 - Shopping Cart"}
    });
    
    const viewButtons = document.querySelectorAll("[data-view]");
    for (let viewButton of viewButtons) {
        viewButton.addEventListener("click", () => views.showView(viewButton.dataset.view));
    }

    handleAboutButton();
}

/**
 * Sets the event listeneres for the filter accordions on the Browse view.
 */
export function installBrowseAccordionEventListeners() {
    const accordionNodes = document.querySelectorAll(".filter-accordion");
    let accordions = [];
    for (let accordion of accordionNodes) {
        accordions.push(new Accordion(accordion));
    }
    return accordions;
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

