const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes');

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'client')));

// Route handling
app.use('/', notificationRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
