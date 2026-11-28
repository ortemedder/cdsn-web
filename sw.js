// sw.js - permite instalar la web como app y que abra aunque falle la conexion
// La pagina se guarda en el movil; los datos (faccion.json) se piden siempre nuevos y,
// si no hay red, se usa la ultima copia guardada.
const CACHE = "cdsn-v64";
const BASE = ["./", "index.html", "app.js", "manifest.json", "icon-192.png", "icon-512.png", "favicon.png", "special-elite.woff2", "sello-cdsn.png", "arranque.jpg", "fondo.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (u.hostname === "raw.githubusercontent.com") {          // datos: red primero, copia si no hay red
    e.respondWith(fetch(e.request).then(r => {
      const copia = r.clone(); caches.open(CACHE).then(c => c.put(u.origin + u.pathname, copia)); return r;
    }).catch(() => caches.match(u.origin + u.pathname)));
    return;
  }
  if (u.origin === location.origin) {                        // pagina: red primero (asi se actualiza), copia si no hay red
    e.respondWith(fetch(e.request).then(r => {
      const copia = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  }
});
