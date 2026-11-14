
/**
 * Populates all filters based on the given productsInfo object
 * @param productsInfo {
 *                      brands: {},
 *                      categories: {},
 *                      tags: {},
 *                      price-range: {lowest, highest},
 *                      ratings: {{rating: <int>, amount: <int>}}
 *                      }
 */
function populateBrowseFilters(productsInfo) {
    populateBrandsFilter(productsInfo["brands"]);
}

function populateBrandsFilter(brands) {
    const brandsFilter = document.querySelector("#brands-dropdown-list");

    for (let brand of brands) {
        
    }
}