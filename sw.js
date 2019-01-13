'use strict';

(function () {
  let CACHE_NAME = `my-cache`;
  let urlsToCache = [
    `offline.html`,
    `favicon-offline.ico`
  ];

  self.addEventListener(`install`, (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.addAll(urlsToCache);
          })
    );
  });

  self.addEventListener(`activate`, () => {
    console.log(`Activated!`);
  });

  function isOffline(request) {
    return request.method === `GET` && request.destination === `document`;
  }

  self.addEventListener(`fetch`, (event) => {
    event.respondWith(
        caches.open(CACHE_NAME)
          .then(function (cache) {
            return fetch(event.request)
              .then(function (response) {
                return response;
              })
              .catch(() => {
                if (isOffline(event.request)) {
                  return cache.match(`offline.html`);
                }
              });
          })
    );
  });
})();
