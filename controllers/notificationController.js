const webpush = require('web-push');

// VAPID keys should be generated only once and kept safe
const publicVapidKey = 'BESHL4Ekmil8IEVhgnMGpLF6cK-Boptea70qii8KC6iyO3RbwrKGBw-mQK74l_8d-7KCwaGsJmnCRmf6EHzdB8k';
const privateVapidKey = 'wayM7MDge1mYlfGA6XV1TwKNZAak4l10RqQbv03hK18';

webpush.setVapidDetails('mailto:arya.pathak2004@gmail.com', publicVapidKey, privateVapidKey);

/**
 * Handles subscription requests and sends a push notification.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 */
const subscribe = (req, res) => {
    const subscription = req.body;
    
    // Send 201 - resource created
    res.status(201).json({});
    
    // Create payload
    const payload = JSON.stringify({ title: 'Push Test from Ziegler' });

    // Pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(error => console.error(error));
};

module.exports = {
    subscribe
};
