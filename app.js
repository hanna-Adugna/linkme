const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Route Handler Middleware initialization
const answerRoutes = require('./api/routes/answers');
const bankAccountRoutes = require('./api/routes/bankAccounts');
const categoryRoutes = require('./api/routes/categories');
const chatRoutes = require('./api/routes/chats');
const commissionRoutes = require('./api/routes/commissions');
const feedbackRoutes = require('./api/routes/feedbacks');
const formRoutes = require('./api/routes/forms');
const jobRoutes = require('./api/routes/jobs');
const newsRoutes = require('./api/routes/news');
const userRoutes = require('./api/routes/users');

//db connection mongodb+srv://linkme:
mongoose.connect('mongodb+srv://linkme:' +
    process.env.MONGO_ATLAS_PW +
    '@linkmecluster.xj5bn.mongodb.net/LinkMeDB?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Database Connected'))
    .catch(err => {
        console.log(err);
    });
    // for the deprecation warning
mongoose.Promise = global.Promise;

// dev tools (any request/respons will be passed by morgon then will output logs )
app.use(morgan('dev'));
//
app.use('/uploads', express.static('uploads'));
// bodyparser == what kind of body do you want to parse its hepls to use req.body
// we want to use simple urlencoded parsing not extended
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// CORS Error Handling
app.use((req, res, next) => {
    // * give access to any or origin www.linkme.com not allowing other webpages from accessing our API
    res.header('Access-Control-Allow-Origin', '*');
    // what kind of headers do you accept 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, ' +
        'Content-Type, Accept, Authorization');
        // browser will always send option request first when you send post or put request 
    if (req.method === 'OPTIONS') {
        // telling the browser what it may send
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    // if the if option is not working this next will let other routes to work
    next();
});
// Routes (/answers is a filter 
// any request that start with /answers will go to answerRoute file)
app.use('/answers', answerRoutes);
app.use('/bankAccounts', bankAccountRoutes);
app.use('/categories', categoryRoutes);
app.use('/chats', chatRoutes);
app.use('/commissions', commissionRoutes);
app.use('/feedbacks', feedbackRoutes);
app.use('/forms', formRoutes);
app.use('/jobs', jobRoutes);
app.use('/news', newsRoutes);
app.use('/users', userRoutes);
// Error Handlers before this the error was in HTML format with html tags
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// use is a middleware (an incoming request has to go through app.use)
// we arr using an arrow function
// next is to say go to next to middleware we cant unuse it
// 500 for db errors and 404 for page not found
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        // json file to check if the header is right json in a string format
        error: {
            status: error.status,
            message: error.message
        }
    });
});

module.exports = app;