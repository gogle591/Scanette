var MyCache = 'SAMP_TPCach';
var contentToCache = [
  './index.html',
  './style.css',
  './produits.csv',
  './manifest.json',
  './favicon.ico',
  './js/app.js',
  './js/DecoderWorker.js',
  './js/exif.js',
  './js/job.js',
  './images/barcode-scanner.png',
  './images/icon-cart.png',
  './images/icon-setup.png',
  './images/icon-transmit.png',
  './images/logo.png',
  './icons/icon-32.png',
  './icons/icon-64.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-168.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-512.png'

];

self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(MyCache).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(MyCache).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});