const cacheName = 'task-manager-cache-v1';
const staticAssets = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  '/images/placeholder.jpg'
];

// Install event: Cache static assets
self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Fetch event: Serve cached data if offline
self.addEventListener('fetch', e => {
  e.respondWith(cacheFirst(e.request));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

// Push notification event
self.addEventListener('push', event => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/images/icon-192.png'
  });
});
