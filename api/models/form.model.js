const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID: { type: mongoose.Schema.Types.ObjectId, require: true},
    questions: { type: Object, require: true},
    
});

module.exports = mongoose.model('Form', formSchema);