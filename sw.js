//ASIGNAR NOMBRE Y VERSION DE CACHE
const CACHE_NAME = 'v_1_ASM',
urlsToCache=[
    '/',
    'index.html',
    'assets/css/style-login.css',
    'assets/css/style-side.css',
    'assets/css/style.css',
    'assets/img/icons/apple-touch-icon-57x57.png',
    'assets/img/icons/apple-touch-icon-72x72.png',
    'assets/img/icons/apple-touch-icon-76x76.png',
    'assets/img/icons/apple-touch-icon-114x114.png',
    'assets/img/icons/apple-touch-icon-120x120.png',
    'assets/img/icons/apple-touch-icon-144x144.png',
    'assets/img/icons/apple-touch-icon-152x152.png',
    'assets/img/icons/apple-touch-icon-180x180.png',
    'assets/img/icons/apple-touch-icon.png',
    'assets/img/icons/favicon.ico',
    'assets/js/main.js'        
]
//Se almacena en cache todos los elementos estaticos del sitio
self.addEventListener('install', e=>{
e.waitUntil(caches.open(CACHE_NAME)
.then(cache=>{
    return cache.addAll(urlsToCache)
    .then(()=>self.skipWaiting())
})
.catch(err=>console.log('Fallo el registro de cache',err))
)
});
//una vez se isntala el SW, se activa y busca los recursos para que funcione sin conexion
self.addEventListener('active',e=>{
    const cacheWhitelist = [CACHE_NAME]
Element.waitUntil(
    cache.keys()
    .then(cacheNames=>{
        cacheNames.map(cacheName=>{
            //Elimina lo que ya no se necesita en cache
            if(cacheWhitelist.indexOf(cacheName)===-1){
                return caches.delete(cacheName)
            }
        })
    })
    //Le indica al SW activar el cache actual
    .then(()=>self.clients.claim())
)
});
//cuando el navegador recupera una url
self.addEventListener('fetch',e=>{
e.respondWith(
    caches.match(e.request)
    .then(res=>{
        if(res){
            //recupera del cache
            return res
        }
        //recupera la peticion desde la url
        return fetch(e.request)
    })
)
});