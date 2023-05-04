
const publicVapidKey = 'BESHL4Ekmil8IEVhgnMGpLF6cK-Boptea70qii8KC6iyO3RbwrKGBw-mQK74l_8d-7KCwaGsJmnCRmf6EHzdB8k';

//check for service worker

if('serviceWorker' in navigator){
    send().catch(err =>{
        console.log(err)
    })
}
//register service workder, register push, send ppush
async function send(){
    //reg SW
    console.log("registering service worker");
    const register = await navigator.serviceWorker.register('./worker.js',{
        scope: '/'
    });
    console.log('service worker regestered')

    //reg PUSH
    const subscribtion = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(publicVapidKey)
    
    })
    console.log("push regis")

    //send push
    await fetch('/subs',{
        method: 'POST',
        body: JSON.stringify(subscribtion),
        headers:{
            'content-type': 'application/json'
        }
    })
    console.log('push sent')
} 

function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray; 
  }