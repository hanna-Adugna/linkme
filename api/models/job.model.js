const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: String,
        // category_ID: mongoose.Schema.Types.ObjectId,
        // type: String,
        duration: Date,
        // price: String,
        // location: String,
        // description: String 
});

module.exports = mongoose.model('Job',jobSchema);