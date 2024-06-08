// Public VAPID key for push notifications
const publicVapidKey = 'BESHL4Ekmil8IEVhgnMGpLF6cK-Boptea70qii8KC6iyO3RbwrKGBw-mQK74l_8d-7KCwaGsJmnCRmf6EHzdB8k';

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    document.getElementById('subscribeButton').addEventListener('click', () => {
        send().catch(err => {
            console.error('Service Worker registration or push subscription failed:', err);
        });
    });
}

/**
 * Registers the service worker, registers push notifications, and sends the subscription to the server.
 */
async function send() {
    // Register service worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/js/worker.js', { scope: '/' });
    console.log('Service worker registered.');

    // Register push
    console.log('Registering push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered.');

    // Send push subscription to the server
    console.log('Sending push subscription...');
    await fetch('/subs', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log('Push subscription sent.');
}

/**
 * Converts a base64 string to a Uint8Array.
 * @param {string} base64String - The base64 encoded string.
 * @returns {Uint8Array} - The converted Uint8Array.
 */
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * Converts a base64 string to an ArrayBuffer.
 * @param {string} base64 - The base64 encoded string.
 * @returns {ArrayBuffer} - The converted ArrayBuffer.
 */
function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

const BASE64_MARKER = ';base64,';

/**
 * Converts a data URI to a binary array.
 * @param {string} dataURI - The data URI to convert.
 * @returns {Uint8Array} - The converted binary array.
 */
function convertDataURIToBinary(dataURI) {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
}
