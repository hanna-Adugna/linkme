const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bidID: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    points: String,
    comment: String,
    
});

module.exports = mongoose.model('Rating', ratingSchema);