/**
 * Installs event listeners for the view selector buttons on the page
 */
export function installHeaderEventListeners(views) {    
    const viewButtons = document.querySelectorAll("[data-view]");
    for (let viewButton of viewButtons) {
        viewButton.addEventListener("click", () => views.showView(viewButton.dataset.view));
    }

    // About is a dialog so it needs its own handlers
    handleAboutButton();
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

