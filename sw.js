'use strict';

let CACHE_NAME = 'my-site-cache';
let urlsToCache = [
  'media/broken.png'
];

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

function isImage(fetchRequest) {
    return fetchRequest.method === 'GET'
           && fetchRequest.destination === 'image';
}

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        if (response.ok) {
          console.log(response);
          return response;
        }
        if (isImage(event.request)) {
          return caches.match('media/broken.png')
            .then((response) => {
              console.log(response);
              return response;
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  )
});