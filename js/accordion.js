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

    this.toggle = () => {
        const isHidden = this.filterList.classList.toggle("hidden");
        this.dropdownIcon.classList.toggle("rotate-90", isHidden);
    }

    this.dropdownButton.addEventListener("click", this.toggle);
}