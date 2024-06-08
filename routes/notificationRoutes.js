const express = require('express');
const path = require('path');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Serve the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Handle subscription requests
router.post('/subs', notificationController.subscribe);

module.exports = router;
