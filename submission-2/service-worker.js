const CACHE_NAME = 'infobola-v1'

let urlsToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/teams.html',
  '/pages/matches.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/manifest.json',
  '/js/nav.js',
  '/icon.png',
]

// Install service worker
// Open cache
// Cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener('fetch', (event) => {
  const api_url = 'https://api.football-data.org/v2/'
  if (event.request.url.indexOf(api_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone())
          return response
        })
      }),
    )
  } else if (event.request.url.indexOf(('https://upload.wikimedia.org/wikipedia/') > -1)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone())
          return response
        })
      }),
    )
  } else {
    event.respondWith(
      caches
        .match(event.request, { ignoreSearch: true })
        .then(function(response) {
          return response || fetch(event.request)
        }),
    )
  }
})

// Remove previous cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`ServiceWorker: cache ${cacheName} dihapus`)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})


// Activate Push Notification
self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text() 
  } else {
    body = 'Push message kosong!'
  }

  var options = {
    body: body,
    icon: '/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  }

  event.waitUntil(self.registration.showNotification('Push notification', options))
})