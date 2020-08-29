if (navigator.serviceWorker){

    if (url.includes('localhost')){
        swLocation = '/sw.js';
    }

    navigator.serviceWorker.register(swLocation);
}