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
