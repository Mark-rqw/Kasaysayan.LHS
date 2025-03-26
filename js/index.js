function loadPage(page) {
    fetch(`${page}.html`) 
        .then(response => response.text())
        .then(data => {
            document.getElementById("pageContent").innerHTML = data;

          
            const existingCSS = document.getElementById("dynamicCSS");
            if (existingCSS) existingCSS.remove();

            const cssLink = document.createElement("link");
            cssLink.id = "dynamicCSS";
            cssLink.rel = "stylesheet";
            cssLink.href = `Kasaysayan.LHS/css/${page}.css`;
            document.head.appendChild(cssLink);

         
            const existingJS = document.getElementById("dynamicJS");
            if (existingJS) existingJS.remove();

            const script = document.createElement("script");
            script.id = "dynamicJS";
            script.src = `Kasaysayan.LHS/js/${page}.js`;
            script.defer = true;
            document.body.appendChild(script);
        })
        .catch(error => console.error("Error loading page:", error));
}


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
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

function notify(){
    let notify = document.querySelector('.notification');
    notify.classList.toggle('showNotify');
}
