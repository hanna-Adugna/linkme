const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    bidID: { type: mongoose.Schema.Types.ObjectId, require: true},
    userID:{ type: mongoose.Schema.Types.ObjectId, require: true},
    points: { type: Number, require: true},
    comment: { type: String, require: true},
    
});

module.exports = mongoose.model('Rating', ratingSchema);