const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        formID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Form'},
        answerID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Answer'},
        jobStatus: { type: String, require: true},
});

module.exports = mongoose.model('Job',jobSchema);