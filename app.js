const express = require('express');
const app = express();
const path = require('path');
const webpush = require('web-push')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
//PS C:\Users\arya2\Documents\Webd\push_noti> ./node_modules/.bin/web-push generate-vapid-keys
// above used to generate vapid-keys

app.use(express.static(path.join(__dirname,'client')))


const publicVapidKey = 'BESHL4Ekmil8IEVhgnMGpLF6cK-Boptea70qii8KC6iyO3RbwrKGBw-mQK74l_8d-7KCwaGsJmnCRmf6EHzdB8k';
const prvateVapidKey = 'wayM7MDge1mYlfGA6XV1TwKNZAak4l10RqQbv03hK18';

webpush.setVapidDetails('mailto:arya.pathak2004@gmail.com', publicVapidKey, prvateVapidKey);

app.get('/', (req,res)=>{
    res.render('index.html')
})

app.post('/subs', (req,res)=>{
    const subscribtion = req.body;
    //201-resource created successfully
    res.status(201).json({})
    //payload
    const payload = JSON.stringify({title: "push test_zieg"})

    //pass object into sendNotif
    webpush.sendNotification(subscribtion, payload).then(e => console.log(e)).catch(e => console.log(e))
})


app.listen(3000,()=>{
    console.log('sucsex')
})