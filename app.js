const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Route Handler Middleware initialization
const bidRoutes = require('./api/routes/bids');
const categoryRoutes = require('./api/routes/categories');

// dev tools
// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Error Handling
<<<<<<< HEAD
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
//         'Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// });
=======
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
>>>>>>> c108435a95137af4499dc2d9efe7780f12db2b43

// Routes
app.use('/bids', bidRoutes);
app.use('/categories',categoryRoutes);

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