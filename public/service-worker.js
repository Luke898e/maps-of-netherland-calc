const CACHE_VERSION = "v1";
const NAV_CACHE = `global-tax-suite-nav-${CACHE_VERSION}`;
const ASSET_CACHE = `global-tax-suite-assets-${CACHE_VERSION}`;

const PRECACHE_URLS = ["/", "/tools/nigeria-zero-tax-auditor", "/tools/uk-fig-regime-eligibility", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(NAV_CACHE).then((cache) => {
      return Promise.all(
        PRECACHE_URLS.map(async (url) => {
          try {
            const response = await fetch(url, { cache: "no-cache" });
            if (response.ok) {
              await cache.put(url, response);
            }
          } catch {
            // Ignore failed precache entries and continue installing.
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== NAV_CACHE && key !== ASSET_CACHE)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(NAV_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) {
            return cached;
          }
          return caches.match("/") || Response.error();
        })
    );
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/icons/")) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          const responseClone = response.clone();
          caches.open(ASSET_CACHE).then((cache) => cache.put(request, responseClone));
          return response;
        });
      })
    );
  }
});
