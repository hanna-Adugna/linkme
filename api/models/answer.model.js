const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        form_ID: String,
        answers: String
});

module.exports = mongoose.model('Answer',answerSchema);