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
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('zen-app').then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('add page to offline'+response.url)
        return cache.put(request, response);
      });
    });
  };
});

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