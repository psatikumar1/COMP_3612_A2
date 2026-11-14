/**
 * Creates a view manager object containing view objects
 * 
 * @param views list of view objects in form of { view: { id: "#", viewTitle: ""} } 
 */
export function ViewManager(views) {
    this.views = views;
    
    this.showView = (viewName) => {
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
    }
}