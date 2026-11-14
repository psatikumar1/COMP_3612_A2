import * as EventListeners from "./eventListeners.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    EventListeners.setHeaderEventListeners();
    EventListeners.setBrowseFilterEventListeners();
}