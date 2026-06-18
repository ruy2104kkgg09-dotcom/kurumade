const CACHE_NAME = "kuruma-app-v1";
const ASSETS = ["./","index.html","manifest.json",
  "assets/icons/icon-192.png","assets/icons/icon-512.png",
  "assets/icons/icon-maskable-192.png","assets/icons/icon-maskable-512.png",
  "assets/icons/apple-touch-icon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>Promise.all(ASSETS.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener("fetch",e=>{e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));});
