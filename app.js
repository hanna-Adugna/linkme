const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Route Handler Middleware initialization
const bidRoutes = require('./api/routes/bids');
const categoryRoutes = require('./api/routes/categories');
const userRoutes = require('./api/routes/users');
const formRoutes = require('./api/routes/forms');
const answerRoutes = require('./api/routes/answers');
const jobRoutes = require('./api/routes/jobs');
const ratingRoutes = require('./api/routes/ratings');


//db connection 
mongoose.connect('mongodb+srv://linkme:' +
    process.env.MONGO_ATLAS_PW +
    '@linkme-pnryd.mongodb.net/test?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Database Connected'))
    .catch(err => {
        console.log(err);
    });
mongoose.Promise = global.Promise;

// dev tools
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Error Handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
        'Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/bids', bidRoutes);
app.use('/categories', categoryRoutes);
app.use('/users', userRoutes);
app.use('/forms', formRoutes);
app.use('/answers', answerRoutes);
app.use('/jobs', jobRoutes);
app.use('/ratings', ratingRoutes);

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