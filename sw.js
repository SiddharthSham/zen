---
layout: null
---

const APP_CACHE_NAME = 'zen-app';
const staticCacheName = "zen-static";

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('{{ site.baseurl }}/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

const filesToCache = [
  "/",
  {% for page in site.html_pages %}
    '{{ page.url }}',
  {% endfor %}
  {% for post in site.blog %}
    '{{ post.url }}',
  {% endfor %}

  // can be automated rather than manual entries
  "/assets/images/",
  "/assets/js/",
  "/assests/css/main.css",
  "/assests/css/screen.css",
  "/about.md",
  "/index.html"
];

self.addEventListener('install',function(e){
    e.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME),
            caches.open(APP_CACHE_NAME),
            self.skipWaiting()
          ]).then(function(storage){
            var static_cache = storage[0];
            var app_cache = storage[1];
            return Promise.all([
              static_cache.addAll(CACHE_STATIC),
              app_cache.addAll(CACHE_APP)]);
        })
    );
});

  self.addEventListener('activate', function(e) {
    e.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then(function(cacheNames) {
                return Promise.all(
                    cacheNames.map(function(cacheName) {
                        if (cacheName !== APP_CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
                            console.log('deleting',cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

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
  });