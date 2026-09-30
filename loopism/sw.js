// Replaces the game's service worker at the old address. A copy of the game open there
// fetches this on its next check, and it hands every page to the network (the redirect)
// and removes itself and its kept copies, so nothing old is served from that address again.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  for (const k of await caches.keys()) await caches.delete(k);
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
})()));
