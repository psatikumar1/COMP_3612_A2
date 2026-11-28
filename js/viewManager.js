import { initBrowse } from "./browse.js";
import { getActiveView } from "./appData.js";
/**
 * Creates a view manager object containing view objects
 * 
 * @param views list of view objects in form of { view: { id: "#", viewTitle: ""} } 
 */
export function ViewManager(views) {
    this.views = views;
    
    this.showView = (viewName) => {
        let previousView = getActiveView();
        const id = (this.views[viewName]).id;
        const viewTitle = (this.views[viewName]).title;

        // Hide all views
        const viewNodes = document.querySelectorAll(".page-view");
        for (let view of viewNodes) {
            view.classList.add("hidden");
        }

        // Show the selected view
        const newView = document.querySelector(id);
        newView.classList.remove("hidden");

        // Set the title to match the selected view
        document.title = viewTitle;

        console.log(getActiveView());
        if (viewName == "browse" && previousView !== "#browse") {
            return startBrowseView();
        }
    }
}

async function startBrowseView() {
    await initBrowse();
}