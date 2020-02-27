const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        // category_ID: String,
        // type: String,
        duration: String,
        // price: String,
        // location: String,
        // description: String 
});

module.exports = mongoose.model('Job',jobSchema);