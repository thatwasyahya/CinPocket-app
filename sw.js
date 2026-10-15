/* CinPocket service worker — généré au build */
const CACHE = 'cinpocket-4c103ccf110a';
const PRECACHE = ["./","./confidentialite.html","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg","./licences.txt","./manifest.webmanifest","./assets/schibsted-grotesk-latin-wght-normal-Bb8VGrTG.woff2","./assets/playwrite-fr-moderne-fallback-wght-normal-B1Gyjl29.woff2","./assets/schibsted-grotesk-latin-ext-wght-normal-hsMS0n0O.woff2","./assets/index-DScdjzTv.css","./assets/index-DqGi5ByF.js","./assets/web-BKsFYfSm.js","./assets/web-UN3t4BXO.js"];

self.addEventListener('install', (event) => {
  // cache: 'reload' ignore le cache HTTP du navigateur : on n'enregistre jamais une ancienne version.
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('cinpocket-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    // Réseau d'abord pour la page (mises à jour), cache en secours (hors ligne).
    event.respondWith(fetch(request, { cache: 'no-cache' }).catch(() => caches.match('./', { ignoreSearch: true })));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
});
