// constant to track active view. Active view is home on webpage load
// exports found on https://stackoverflow.com/questions/48211891/import-functions-from-another-js-file-javascript
export const getActiveView = () => {
    const views = document.querySelectorAll(".view");
    for (let view of views) {
        if (!(view.classList.contains("hidden"))) {
            return "#" + view.id;
        }
    }
};