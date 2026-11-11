//
//---For helping to swtich between page views---
//
function showHome(){
    showView("#home");
}

function showBrowse(){
    showView("#browse");
}

function showCategory(){
    showView("#category");
}

function showCart(){
    showView("#cart");
}

function showView(viewSelector) {
    const views = document.querySelectorAll("article");

    //Hides all pages
    for (let view of views){
        view.classList.add("hidden");
    }
    //Shows the selected page
    const selectedView = document.querySelector(viewSelector);
    selectedView.classList.remove("hidden");
}
