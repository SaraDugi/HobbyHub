// Define a cache name and the list of static assets that do not change
const CACHE_NAME = 'pwa-task-manager-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/login.html',
  '/styles.css',
  '/manifest.json',
  '/src/app.js',
  '/src/lazyload.js'
];

// Install event: cache static assets
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Installing and caching static assets...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => console.error('[ServiceWorker] Caching failed during install:', error))
  );
  self.skipWaiting();
});

// Activate event: clear old caches
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activating and cleaning up old caches...');
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Deleting cache:', key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// Fetch event: respond with cached assets when available, fall back to network if not cached
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
      .catch(error => {
        console.error('[ServiceWorker] Fetch error:', error, 'for request:', event.request.url);
        return new Response('Service Unavailable', { status: 503 });
      })
  );
});

// Listen for push events and display notifications
self.addEventListener('push', event => {
  console.log('[ServiceWorker] Push Received.');
  let notificationData = {};
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = { title: 'Notification', body: event.data.text() };
    }
  }
  const title = notificationData.title || 'New Notification';
  const options = {
    body: notificationData.body || 'You have a new message.',
    icon: notificationData.icon || '/images/icons/icon-192x192.png',
    badge: notificationData.badge || '/images/icons/icon-72x72.png'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification click events
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
