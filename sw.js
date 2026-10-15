// Auditory Range service worker: keeps the app usable offline and fast on repeat visits.
const V = 'ar-v1';
const SHELL = ['./', 'index.html', 'catalog.json', 'manifest.webmanifest', 'icon-192.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V && k !== 'ar-covers' && k !== 'ar-media').map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.hostname === 'api.github.com') return;
  // album artwork and Wikipedia extras never change: cache first
  if (u.origin === location.origin && /\/(t|c|w)\/[^/]+$/.test(u.pathname)) {
    e.respondWith(caches.open('ar-media').then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })));
    return;
  }
  // fonts: cache first
  if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open(V).then(async c => (await c.match(e.request)) || fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; })));
    return;
  }
  // the app itself: network first so updates arrive, cache when offline
  if (u.origin === location.origin) {
    e.respondWith(fetch(e.request).then(r => { if (r.ok) caches.open(V).then(c => c.put(e.request, r.clone())); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
  }
});
