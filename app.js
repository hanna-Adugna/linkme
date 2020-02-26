const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Route Handler Middleware initialization
const bidRoutes = require('./api/routes/bids');
const categoryRoutes = require('./api/routes/categories');

// Routes
app.use('/bids', bidRoutes);
app.use('/categories', categoryRoutes);

// Error Handlers
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            status: error.status,
            message: error.message
        }
    });
});

module.exports = app;