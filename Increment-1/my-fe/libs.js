const registerSW = (ver = "1") => `const CACHE_NAME = "cache-v${ver}";
const CACHED_URLS = ["/", "/main.js", "/main.css", "/bulma.css", "/theme.css"];

// Open cache on install.
self.addEventListener("install", (event) => {
   event.waitUntil(
      (async function () {
         const cache = await caches.open(CACHE_NAME);

         await cache.addAll(CACHED_URLS);
      })()
   );
});

// Cache and update with stale-while-revalidate policy.
self.addEventListener("fetch", (event) => {
   const { request } = event;

   // Prevent Chrome Developer Tools error:
   // Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
   //
   // See also https://stackoverflow.com/a/49719964/1217468
   if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
      return;
   }

   event.respondWith(
      (async function () {
         const cache = await caches.open(CACHE_NAME);

         const cachedResponsePromise = await cache.match(request);
         const networkResponsePromise = fetch(request);

         if (request.url.startsWith(self.location.origin)) {
            event.waitUntil(
               (async function () {
                  const networkResponse = await networkResponsePromise;

                  await cache.put(request, networkResponse.clone());
               })()
            );
         }

         return cachedResponsePromise || networkResponsePromise;
      })()
   );
});

// Clean up caches other than current.
self.addEventListener("activate", (event) => {
   event.waitUntil(
      (async function () {
         const cacheNames = await caches.keys();

         await Promise.all(
            cacheNames
               .filter((cacheName) => {
                  const deleteThisCache = cacheName !== CACHE_NAME;

                  return deleteThisCache;
               })
               .map((cacheName) => caches.delete(cacheName))
         );
      })()
   );
});
`;

const unregisterSW = () => `self.addEventListener("install", function (e) {
   self.skipWaiting();
});

self.addEventListener("activate", function (e) {
   console.log("Unregistering service worker");
   caches.keys().then(function (names) {
      for (let name of names) caches.delete(name);
   });
   self.registration
      .unregister()
      .then(function () {
         return self.clients.matchAll();
      })
      .then(function (clients) {
         clients.forEach((client) => {
            console.log("Navigating", client.url);
            client.navigate(client.url);
         });
      });
});
`;

const contentType = (ext) => {
   const types = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript",
      ".json": "application/json",
      ".xml": "application/xml",
      ".pdf": "application/pdf",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".webp": "image/webp",
      ".txt": "text/plain",
      ".md": "text/markdown",
      ".zip": "application/zip",
      ".tar": "application/x-tar",
      ".gz": "application/gzip",
      ".mp3": "audio/mpeg",
      ".ogg": "audio/ogg",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".woff": "application/font-woff",
      ".woff2": "application/font-woff2",
      ".eot": "application/vnd.ms-fontobject",
      ".ttf": "font/ttf",
      ".otf": "font/otf",
      ".csv": "text/csv",
      ".xls": "application/vnd.ms-excel",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".ogg": "audio/ogg",
      ".weba": "audio/webm",
      ".webm": "video/webm",
      ".avi": "video/avi",
      ".mpg": "video/mpeg",
      ".mpeg": "video/mpeg",
      ".wav": "audio/wav",
      ".webm": "video/webm",
      ".mov": "video/quicktime",
   };
   return types[ext] || "application/octet-stream";
};

const reloadScript = (port) => `<script>
let socketUrl="ws://localhost:${port}";
let wss = new WebSocket(socketUrl);
wss.onclose = () => {
\tlet start = () => {
\t\twss = new WebSocket(socketUrl);
\t\twss.onerror = () => setTimeout(start, 3000);
\t\twss.onopen = () => location.reload();
\t\t};
\tstart();
};
wss.onmessage = ev => {
\tif (ev.data === "reload") location.reload();
}
</script>`;

const indexOfHome = (title = "Home") => `<script></script>\n
<article>
\t<hgroup>
\t\t<h1>${title[0].toUpperCase() + title.slice(1)}</h1>
\t\t<h3 mute>About ${title.toLowerCase()}</h3>
\t</hgroup>
\t<hr>
\t<p>...contents here</p>
</article>`;

const indexOfPage = `<script>
\timport * as pages from "./";
\timport E404 from "../../modules/E404.svelte";
\texport let params = {};\n
\tlet cmp;\n
\t$:params, cmp = pages[params["0"]] || null;
</script>

{#if Object.keys(params).length === 0}
\t<article>
\t\t<hgroup>
\t\t\t<h1>Features</h1>
\t\t\t<h3 mute>About Features</h3>
\t\t</hgroup>
\t\t<hr>
\t\t<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit impedit, magnam voluptatum excepturi earum unde adipisci nihil minus, autem voluptate quidem alias quos accusantium maxime dolores laboriosam. Sapiente, sunt veniam.</p>
\t\t{#if typeof params === "object"}
\t\t\t<br>
\t\t\t<pre>{JSON.stringify(params)}</pre>   
\t\t{/if}
\t</article>
{:else if cmp }
\t<svelte:component this={cmp} {params} />
{:else}
\t<E404/>
{/if}
`;

const whiteColor = "\x1b[39m";
const redColor = "\x1b[91m";
const greenColor = "\x1b[32m";

const getTime = () => `[${new Date().toLocaleTimeString().replaceAll(".", ":")}]`;

module.exports = {
   reloadScript,
   whiteColor,
   redColor,
   greenColor,
   getTime,
   contentType,
   indexOfHome,
   indexOfPage,
   registerSW,
   unregisterSW,
};
