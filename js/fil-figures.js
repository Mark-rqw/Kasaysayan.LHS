function loadPage(page) {
    fetch(`${page}.html`) // ✅ Now correctly uses the page parameter
        .then(response => response.text())
        .then(data => {
            document.getElementById("pageContent").innerHTML = data;

   
            const existingCSS = document.getElementById("dynamicCSS");
            if (existingCSS) existingCSS.remove();

            const cssLink = document.createElement("link");
            cssLink.id = "dynamicCSS";
            cssLink.rel = "stylesheet";
            cssLink.href = `${page}.css`; // ✅ Dynamically loads correct CSS
            document.head.appendChild(cssLink);

            const existingJS = document.getElementById("dynamicJS");
            if (existingJS) existingJS.remove();

            const script = document.createElement("script");
            script.id = "dynamicJS";
            script.src = `${page}.js`; // ✅ Dynamically loads correct JS
            document.body.appendChild(script);
        })
        .catch(error => console.error("Error loading page:", error));
}

function toggleNav() {
    let navBar = document.querySelector(".sidebar");
    navBar.classList.toggle("shownav");
}

function toggledesc(){
    let desc = document.querySelector('.desc-1');
    let name = document.querySelector('.name-1');
    desc.classList.toggle('showdesc');
    name.classList.toggle('liftName');
}
function toggledesc2(){
    let desc = document.querySelector('.desc-2');
    let name = document.querySelector('.name-2');
    desc.classList.toggle('showdesc');
    name.classList.toggle('liftName');
}
function toggledesc3(){
    let desc = document.querySelector('.desc-3');
    let name = document.querySelector('.name-3');
    desc.classList.toggle('showdesc');
    name.classList.toggle('liftName');
}

window.addEventListener("scroll", function () {
    let element = document.querySelector(".topNav");
    if (window.scrollY) {
        element.classList.add("scrolled");
    } else {
        element.classList.remove("scrolled");
    }
});


window.addEventListener("scroll", function () {
    let elements = document.querySelectorAll(".ctnr-1, .ctnr-2, .ctnr-3");

    elements.forEach((element) => {
        let elementTop = element.getBoundingClientRect().top;
        let triggerPoint = window.innerHeight / 1.5; 

        if (elementTop < triggerPoint) {
            element.classList.add("scrolled-div");
        } else {
            element.classList.remove("scrolled-div");
        }
    });
});