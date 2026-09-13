// オフライン対応 Service Worker
// ------------------------------------------------------------
// バージョンは version.js に一本化している。更新の配布時はあちらだけを上げること。
// 取得はネットワーク優先なので、ページを読み込み直せば必ず新しいファイルが届く。
// ここでのバージョンは、古いキャッシュを捨てるための名前として使う。
// ------------------------------------------------------------
importScripts("./version.js");
const CACHE_NAME = `wine-trainer-${APP_VERSION}`;
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./version.js",
  "./app.js",
  "./data.js",
  "./sheets.js",
  "./past-answers.js",
  "./teppan.js",
  "./manifest.json",
  "./icon-180.png",
  "./icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// ネットワーク優先・失敗時キャッシュ（更新が反映されやすく、オフラインでも動く）
// cache:"reload" はブラウザのHTTPキャッシュを見ずに取りに行く。304 での節約はなくなるが、
// 「読み込み直せば必ず最新」を配信先のヘッダー設定に関係なく保証できる。
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // 更新確認のリクエスト（version.js?_=...）は素通しする。キャッシュを汚さないため
  if (new URL(e.request.url).searchParams.has("_")) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(
    fetch(e.request, { cache: "reload" })
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
