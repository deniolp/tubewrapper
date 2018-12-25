
'use strict';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'media/broken.png'
];

<<<<<<< HEAD
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
          return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Activated!');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch event!');
});
=======
  self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Activated!');
  });

  self.addEventListener('fetch', (event) => {
    console.log('Fetch event!');
  });
})();
>>>>>>> 8f1260e53fbc80d6bafab7ee195dcd8b8bfbf8c6
