<<<<<<< HEAD
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of athree days
        maxAgeSeconds: 3 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 3,
      }),
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
    ],
  }),
);
=======
---
layout: null
---

const CACHE_NAME = 'zen-app';
const STATIC_CACHE_NAME = "zen-static";

var urlsToCache = [];

//cache Manifest
urlsToCache.push("/manifest.json")

/* Cache pages
{% for page in site.html_pages %}
  urlsToCache.push("{{ page.url }}")
{% endfor %}
*/

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch("Error source found!");
      })
  );
});

self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open(CACHE_NAME).then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('add page to offline'+response.url)
        return cache.put(request, response);
      })
    });
  };
});
/*
  self.addEventListener('activate', function(e) {
    e.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
                            console.log('deleting',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
*/
/*
  this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(caches.match(event.request)
      .then(function (match) {
        return match || fetch(event.request);
      }).catch(function() {
        return fetch(event.request);
      })
      .then(function(r) {
        response = r;
        caches.open(cacheName).then(function(cache) {
          cache.put(event.request, response);
        });
        return response.clone();
      })
    );
  });*/
>>>>>>> 1080a923a87653b90376e95a5517f9528d24d82d
