import { ViewManager } from "./viewManager.js";
import * as EventListeners from "./eventListeners.js";
import * as Browse from "./browse.js";
import { fetchData } from "./dataFetcher.js";

document.addEventListener("DOMContentLoaded", init);

async function init() {
    const views = new ViewManager({
        home: { id: "#home", title: "COMP3612 Store" },
        browse: { id: "#browse", title: "COMP3612 - Browse Products" },
        category: { id: "#category", title: "COMP3612 - Shop by Category" },
        cart: { id: "#cart", title: "COMP3612 - Shopping Cart"}
    });

    EventListeners.installHeaderEventListeners(views);
    const data = await fetchData();
}
// function init() {
//     // Install Static Listeners
//     EventListeners.installHeaderEventListeners();
//     EventListeners.installCartEventListeners();
//     EventListeners.installHomeProductEventListeners();
//     EventListeners.installCategoryEventListeners();
//     let accordions = EventListeners.installBrowseAccordionEventListeners();
//     const data = EventListeners.installDataFetcher();
// }