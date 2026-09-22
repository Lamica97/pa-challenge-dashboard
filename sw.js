const CACHE_NAME = 'pa-dashboard-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './infographic_ประเด็นท้าทาย_bento_dashboard.html',
  './manifest.json',
  './รูปภาพ/SUW%20Logo.png',
  './รูปภาพ/apple-touch-icon.png',
  './รูปภาพ/icon-192.png',
  './รูปภาพ/icon-512.png',
  'https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request)).catch(() => fetch(event.request))
  );
});
