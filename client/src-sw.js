const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // This function defines the types of requests to cache. 
  // It caches requests for stylesheets, scripts, and web workers.
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',

  // This specifies the caching strategy to use, which is 'StaleWhileRevalidate' in this case.
  // 'StaleWhileRevalidate' means it will use the cached response first, then update it with the latest one from the network for next use.
  new StaleWhileRevalidate({
    // 'asset-cache' is the name of the cache where these assets will be stored.
    cacheName: 'asset-cache',

    // The 'plugins' array allows adding features to the caching strategy.
    plugins: [
      // CacheableResponsePlugin decides which responses are considered cacheable.
      new CacheableResponsePlugin({
        // caches responses with status code 200 and 0 
        statuses: [0, 200],
      }),

      // ExpirationPlugin controls how long the cached entries are stored
      new ExpirationPlugin({
        // Cached entries will be kept for 30 days (30 days * 24 hours * 60 minutes * 60 seconds).
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);

