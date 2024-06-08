// Log that the service worker has been loaded
console.log('Service worker loaded.');

/**
 * Event listener for push events.
 * This is triggered when a push notification is received.
 * @param {PushEvent} e - The push event object.
 */
self.addEventListener('push', e => {
    // Parse the data from the push event
    const data = e.data.json();
    console.log('Push received:', data);

    // Show notification
    self.registration.showNotification(data.title, {
        body: data.body || 'You have a new notification.',
        icon: data.icon || '/path/to/default-icon.png'
    });
});
