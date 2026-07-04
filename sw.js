// 🃏 Service Worker - جوكر
// يعمل على تخزين الموقع كاملاً للعمل بدون إنترنت

const CACHE_NAME = 'joker-cache-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  // أضف كل ملفات موقعك هنا
  // '/css/style.css',
  // '/js/main.js',
  // '/images/logo.png',
];

// ============ التثبيت ============
self.addEventListener('install', function(event) {
  console.log('🃏 [جوكر] Service Worker: جاري التثبيت...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('✅ [جوكر] تم فتح الكاش');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('✅ [جوكر] تم تخزين جميع الملفات');
        return self.skipWaiting();
      })
  );
});

// ============ التفعيل ============
self.addEventListener('activate', function(event) {
  console.log('🃏 [جوكر] Service Worker: جاري التفعيل...');
  
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ [جوكر] حذف الكاش القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(function() {
      console.log('✅ [جوكر] Service Worker مفعل وجاهز!');
      return self.clients.claim();
    })
  );
});

// ============ الطلبات ============
self.addEventListener('fetch', function(event) {
  // تجاهل الطلبات التي ليست GET
  if (event.request.method !== 'GET') return;
  
  // تجاهل طلبات Chrome DevTools
  if (event.request.url.includes('chrome-extension')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // إذا وجد الملف في الكاش - أرسله
        if (response) {
          return response;
        }
        
        // إذا لم يوجد - حمله من الشبكة وخزنه
        return fetch(event.request)
          .then(function(networkResponse) {
            // لا تخزن الردود غير الصالحة
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // نسخ الرد وتخزينه
            var responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch(function(error) {
            console.log('⚠️ [جوكر] فشل التحميل:', error);
            
            // إذا فشل التحميل - عرض صفحة خطأ جميلة
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            throw error;
          });
      })
  );
});

// ============ رسائل ============
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(function() {
      console.log('🗑️ [جوكر] تم مسح الكاش');
    });
  }
  
  if (event.data && event.data.type === 'CHECK_UPDATE') {
    self.registration.update().then(function() {
      console.log('🔄 [جوكر] جاري التحقق من التحديثات...');
    });
  }
});

console.log('🃏 [جوكر] Service Worker جاهز ومستعد! 🎭');
