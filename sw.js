const CACHE = 'last-legion-v1-1794917549333';
const ASSETS = ["/last-legion/.nojekyll","/last-legion/assets/barlow-condensed-latin-600-normal-BFJEwTuo.woff","/last-legion/assets/barlow-condensed-latin-600-normal-DepVgxBB.woff2","/last-legion/assets/barlow-condensed-latin-700-normal-Dmwat-ge.woff","/last-legion/assets/barlow-condensed-latin-700-normal-v1xN8_Wq.woff2","/last-legion/assets/barlow-latin-400-normal-fsAxiSwU.woff","/last-legion/assets/barlow-latin-400-normal-qiz4-Cze.woff2","/last-legion/assets/barlow-latin-600-normal-CNwfPWQD.woff","/last-legion/assets/barlow-latin-600-normal-DILqtrty.woff2","/last-legion/assets/index-B3tk5C2C.css","/last-legion/assets/index-BKQMgOLX.js","/last-legion/favicon.svg","/last-legion/icons/icon-192.png","/last-legion/icons/icon-512.png","/last-legion/index.html","/last-legion/manifest.webmanifest"];
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()),
  );
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    try {
      const res = await fetch(req);
      const copy = res.clone();
      const cache = await caches.open(CACHE);
      cache.put(req, copy);
      return res;
    } catch (err) {
      if (req.mode === 'navigate') {
        const home = await caches.match("/last-legion/index.html");
        if (home) return home;
      }
      throw err;
    }
  })());
});
