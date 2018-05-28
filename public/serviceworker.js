self.addEventListener('install', function(event){
  console.log('service worker installing ', event)
  event.waitUntil(
    caches.open('static')
    .then(function(cache){
      console.log('[service Worker] Precaching')
      cache.add('/src/js/app.js')
    })
  )
})

self.addEventListener('activate', function(event){
  console.log('service worker activating ', event)
  return self.clients.claim()
})

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.respondWith(
      caches.match(event.request)
        .then(function(response){
          if(response){
            return response
          } else {
            return fetch(event.request)
          }
        })
    )
  )
})
