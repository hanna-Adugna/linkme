const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Job'},
    questions: { type: Array, require: true },
    
});

module.exports = mongoose.model('Form', formSchema);