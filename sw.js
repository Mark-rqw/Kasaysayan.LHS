const CACHE_NAME = "kasaysayan-cache-v1";
const urlsToCache = [
    "/",                        // Root path (important for start_url)
    "/homepage.html",           // Main page
    "/Fil-Figures.html",        // Filipino figures page
    "/category.html",           // Category page
    "/timeline.html",           // Timeline page
    "/quiz.html",               // Quiz page
    "/about.html",              // About page
    "/manifest.json",           // Manifest (for installable PWA)
    "/sw.js",                   // Service worker itself

    // CSS files
    "/css/homepage.css",
    "/css/fil-figures.css",
    "/css/category.css",
    "/css/timeline.css",
    "/css/quiz.css",
    "/css/about.css",

    // JavaScript files
    "/js/homepage.js",
    "/js/fil-figures.js",
    "/js/category.js",
    "/js/timeline.js",
    "/js/quiz.js",
    "/js/about.js",

    // Icons (for PWA installation)
    "/assets/Kasaysayan_logo.png",
    "/assets/kasaysayan-logo.png",

    // Images (cache only essential images if needed for offline use)
    "/assets/images/Art.jpg",
    "/assets/images/ekis.png",
    "/assets/images/emilio.jpg",
    "/assets/images/joseRizal.jpg",
    "/assets/images/juanLuna.jpg",
    "/assets/images/literature.jpg",
    "/assets/images/menu.png",
    "/assets/images/OoatNaBlack.png",
    "/assets/images/PRP.jpg",
    "/assets/images/war.jpg"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate Service Worker
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

// Fetch Event (Serve cached assets)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
