const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Job'},
    from: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
    to: {type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User'},
    points: { type: Number, require: true},
    comment: { type: String, require: true},
    
});

module.exports = mongoose.model('Feedback', feedbackSchema);