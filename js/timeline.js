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
            cssLink.href = `${page}.css`; // ✅ Dynamically loads correct CSS
            document.head.appendChild(cssLink);

            // Remove existing JS and load new JS
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

window.addEventListener("scroll", function () {
    let element = document.querySelector(".topNav");
    if (window.scrollY > 50) {
        element.classList.add("scrolled");
    } else {
        element.classList.remove("scrolled");
    }
});
