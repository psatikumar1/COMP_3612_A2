/**
 * Creates a filter accordion object with an event listener to toggle the list from visible
 * to hidden and rotate the dropdown arrow icon.
 * 
 * @param parent accordion container object (i.e. #brand-accordion, #category-accordion)
 *               containing the <button> and <ul> for the filter dropdown and filter list
 */
export function Accordion(parent) {
    this.dropdownButton = parent.querySelector("button");
    this.dropdownIcon = this.dropdownButton.querySelector("img");
    this.filterList = parent.querySelector("ul");

    this.open = () => {
        this.filterList.classList.remove("hidden");
        this.dropdownIcon.classList.remove("rotate-90");
    };

    this.close = () => {
        this.filterList.classList.add("hidden");
        this.dropdownIcon.classList.add("rotate-90");
    };

    this.toggle = () => {
        const isHidden = this.filterList.classList.contains("hidden");
        if (isHidden) {
            this.open();
        } else {
            this.close();
        }
    };

    this.dropdownButton.addEventListener("click", this.toggle);
}