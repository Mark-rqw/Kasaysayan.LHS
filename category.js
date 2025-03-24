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

function toggledesc(){
    let showdesc = document.querySelector('.desc');
    let title = document.querySelector('.title');
    let btn = document.querySelector('.readMore');
    let blurBg = document.querySelector('.blur-overlay');
    showdesc.classList.toggle('showdesc');
    title.classList.toggle('hideTitle');
    btn.classList.add('showBtn');
    blurBg.classList.add('showBlur');
}
function hideDesc(){
    let hideDesc = document.querySelector('.desc');
    let showtitle = document.querySelector('.title');
    let btn = document.querySelector('.readMore');
    let blurBg = document.querySelector('.blur-overlay');
    blurBg.classList.remove('showBlur');
    hideDesc.classList.remove('showdesc');
    showtitle.classList.remove('hideTitle');
    btn.classList.remove('showBtn');
}

function toggledesc2(){
    let showdesc = document.querySelector('.desc2');
    let title = document.querySelector('.title2');
    let btn = document.querySelector('.readMore2');
    let blurBg = document.querySelector('.blur-overlay2');
    blurBg.classList.add('showBlur');
    showdesc.classList.toggle('showdesc');
    title.classList.toggle('hideTitle');
    btn.classList.add('showBtn');
}
function hideDesc2(){
    let hideDesc = document.querySelector('.desc2');
    let showtitle = document.querySelector('.title2');
    let btn = document.querySelector('.readMore2');
    let blurBg = document.querySelector('.blur-overlay2');
    blurBg.classList.remove('showBlur');
    btn.classList.remove('showBtn');
    hideDesc.classList.remove('showdesc');
    showtitle.classList.remove('hideTitle');    
}

function toggledesc3(){
    let showdesc = document.querySelector('.desc3');
    let title = document.querySelector('.title3');
    let btn = document.querySelector('.readMore3');
    let blurBg = document.querySelector('.blur-overlay3');
    blurBg.classList.add('showBlur');
    showdesc.classList.toggle('showdesc');
    title.classList.toggle('hideTitle');
    btn.classList.add('showBtn');
}
function hideDesc3(){
    let hideDesc = document.querySelector('.desc3');
    let showtitle = document.querySelector('.title3');
    let btn = document.querySelector('.readMore3');
    let blurBg = document.querySelector('.blur-overlay3');
    blurBg.classList.remove('showBlur');
    btn.classList.remove('showBtn');
    hideDesc.classList.remove('showdesc');
    showtitle.classList.remove('hideTitle');
}

window.addEventListener("scroll", function () {
    let element = document.querySelector(".topNav");
    if (window.scrollY) {
        element.classList.add("scrolled");
    } else {
        element.classList.remove("scrolled");
    }
});
