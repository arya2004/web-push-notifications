console.log('service worker loaded')

self.addEventListener('push', e=>{
    const data = e.data.json();
    console.log('push recived');
    self.registration.showNotification(data.title, {
        body: 'notified worked'
    })
})