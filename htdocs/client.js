console.log("hello! I am the client.js");


// Register service-worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
}