const CACHE_NAME = 'scarti-app-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js',
  'https://unpkg.com/lucide@latest'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLS_TO_CACHE).catch(() => {
          // Se alcuni URL non si possono cachecare, continua comunque
          return Promise.resolve();
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Solo GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Network first per le risorse online, fallback a cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache la risposta se è un GET valido
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Se offline, usa la cache
        return caches.match(event.request)
          .then((response) => {
            return response || new Response('Offline - Risorsa non disponibile', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Periodic sync per sincronizzare dati (facoltativo)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pezzi') {
    event.waitUntil(
      // Qui puoi aggiungere logica di sincronizzazione
      Promise.resolve()
    );
  }
});
