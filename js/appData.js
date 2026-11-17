export const getActiveView = () => {
    const views = document.querySelectorAll(".page-view");
    for (let view of views) {
        if (!(view.classList.contains("hidden"))) {
            return "#" + view.id;
        }
    }
};