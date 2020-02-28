const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID: mongoose.Schema.Types.ObjectId,
    questions: String,
    
});

module.exports = mongoose.model('Form', formSchema);