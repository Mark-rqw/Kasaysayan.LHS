const CACHE_NAME = "kasaysayan-cache-v1";
const urlsToCache = [
    "index.html",
    "Fil-Figures.html",
    "category.html",
    "timeline.html",
    "quiz.html",
    "about.html",
    "manifest.json",
    "sw.js",

    // CSS Files
    "css/homepage.css",
    "css/fil-figures.css",
    "css/category.css",
    "css/timeline.css",
    "css/quiz.css",
    "css/about.css",

    // JS Files
    "js/index.js",
    "js/fil-figures.js",
    "js/category.js",
    "js/timeline.js",
    "js/quiz.js",
    "js/about.js",

    // Icons and Images
    "assets/Kasaysayan_logo.png",
    "assets/kasaysayan-logo.png",
    "assets/images/Art.jpg",
    "assets/images/war.jpg",
    "assets/images/literature.jpg",
    "assets/images/juanLuna.jpg",
    "assets/images/emilio.jpg",
    "assets/images/joseRizal.jpg",
    "assets/images/PRP.jpg"
];

// Register service worker and cache assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(urlsToCache);
        })
    );
});

// Clear old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache...");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch and serve cached content
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
