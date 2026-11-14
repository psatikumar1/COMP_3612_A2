import * as EventListeners from "./eventListeners.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    EventListeners.installHeaderEventListeners();
    let accordions = EventListeners.installBrowseAccordionEventListeners();
}