const CACHE_NAME = 'kasut-kedas'

let urlToCache = [
  '/',
  '/nav.html',
  '/index.html',
  '/pages/home.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/services.html',
  '/css/materialize.min.css',
  '/js/materialize.min.js',
  '/js/nav.js',
  '/assets/img/services-1.jpg',
  '/assets/img/services-2.jpg',
  '/assets/img/services-3.jpg',
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlToCache)
    }),
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log(
            'Service worker: gunakan asset dari cache: ',
            response.url,
          )
          return response
        }

        console.log(
          'Service worker: memuat asset dari server',
          event.request.url,
        )

        return fetch(event.request)
      }),
  )
})

// Remove previous cache
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
