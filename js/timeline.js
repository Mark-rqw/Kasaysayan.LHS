function loadPage(page) {
    fetch(`${page}.html`) // ✅ Now correctly uses the page parameter
        .then(response => response.text())
        .then(data => {
            document.getElementById("pageContent").innerHTML = data;

            // Remove existing CSS and load new CSS
            const existingCSS = document.getElementById("dynamicCSS");
            if (existingCSS) existingCSS.remove();

            const cssLink = document.createElement("link");
            cssLink.id = "dynamicCSS";
            cssLink.rel = "stylesheet";
            cssLink.href = `css/${page}.css`; // ✅ Dynamically loads correct CSS
            document.head.appendChild(cssLink);

            // Remove existing JS and load new JS
            const existingJS = document.getElementById("dynamicJS");
            if (existingJS) existingJS.remove();

            const script = document.createElement("script");
            script.id = "dynamicJS";
            script.src = `js/${page}.js`; // ✅ Dynamically loads correct JS
            document.body.appendChild(script);
        })
        .catch(error => console.error("Error loading page:", error));
}

function toggleNav() {
    let navBar = document.querySelector(".sidebar");
    navBar.classList.toggle("shownav");
}

window.addEventListener("scroll", function () {
    let element = document.querySelector(".topNav");
    if (window.scrollY > 50) {
        element.classList.add("scrolled");
    } else {
        element.classList.remove("scrolled");
    }
});

function factClicked(){
    let fact = document.querySelector('.fact-1');
    let desc = document.querySelector('.more-desc');

    fact.classList.toggle('fact-clicked');
    desc.classList.toggle('show-desc');
}
function factClicked2(){
    let fact = document.querySelector('.fact-2');
    let desc = document.querySelector('.more-desc2');

    fact.classList.toggle('fact-clicked2');
    desc.classList.toggle('show-desc2');
}

function factClicked3(){
    let fact = document.querySelector('.fact-3');
    let desc = document.querySelector('.more-desc3');

    fact.classList.toggle('fact-clicked3');
    desc.classList.toggle('show-desc4');
}

function factClicked4(){
    let fact = document.querySelector('.fact-4');
    let desc = document.querySelector('.more-desc4');

    fact.classList.toggle('fact-clicked4');
    desc.classList.toggle('show-desc4');
}


