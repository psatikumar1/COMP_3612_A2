import * as EventListeners from "./eventListeners.js";
import * as Constants from "./constants.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    // Install Static Listeners
    EventListeners.installHeaderEventListeners();
    let accordions = EventListeners.installBrowseAccordionEventListeners();
    const data = EventListeners.installDataFetcher();
}