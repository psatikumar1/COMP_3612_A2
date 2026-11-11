import { getActiveView } from "./views.js";

function setActiveView(newView) {
    
    // Hit the logo so we want to load the home view
    // but the way we grab the view to change to is by 
    // ID of the button pressed. This ID is "logo-btn"
    // before being spliced to "#" + "logo"
    if (newView == "#logo") {
        newView = "#home";
    }

    const activeView = getActiveView();
    if (activeView == newView) {
        return; // requested view is already active
    }

    let currentViewNode = document.querySelector(activeView);
    currentViewNode.classList.add("hidden");

    currentViewNode = document.querySelector(newView);
    currentViewNode.classList.remove("hidden");
}

export function addHeaderEventListeners() {
    const headerBtnList = document.querySelectorAll("header button");
    for (let btn of headerBtnList) {
        const btnID = btn.getAttribute("id");
        const btnViewTarget = "#" + (btnID.split("-"))[0];
        btn.addEventListener("click", () => setActiveView(btnViewTarget));
    }
}