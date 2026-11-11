import { addHeaderEventListeners } from "./headerEvents.js";
import { getActiveView } from "./views.js";

document.addEventListener("DOMContentLoaded", init);

function init() {
    addHeaderEventListeners();
}