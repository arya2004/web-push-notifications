const express = require('express');
const path = require('path');
const router = express.Router();

// Route to serve the index.html file
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;
