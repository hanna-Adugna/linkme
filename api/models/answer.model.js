const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        form_ID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Form' },
        answers: { type: Object, require: true}

});

module.exports = mongoose.model('Answer',answerSchema);