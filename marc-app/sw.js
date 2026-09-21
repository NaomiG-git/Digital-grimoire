const CACHE="marcs-renovations-v9";
const SHELL=["./manifest.json","./icon.svg"];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET") return;

  if(req.mode==="navigate"){
    event.respondWith(
      fetch(req,{cache:"no-store"})
        .then(resp=>{
          const copy=resp.clone();
          caches.open(CACHE).then(cache=>cache.put("./index.html",copy));
          return resp;
        })
        .catch(()=>caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetch(req)
      .then(resp=>{
        const copy=resp.clone();
        caches.open(CACHE).then(cache=>cache.put(req,copy));
        return resp;
      })
      .catch(()=>caches.match(req))
  );
});