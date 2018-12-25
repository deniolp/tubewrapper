'use strict';

(function() {
  let path = '/myWebComp/';
  if (location.host === 'localhost:3000') {
    path = '/';
  }
  
  let CACHE_NAME = 'my-site-cache';
  let urlsToCache = [
    path + 'media/broken.png'
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

  self.addEventListener('fetch', (event) => {
    console.log('Fetch event!')
  });
})();