const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        JobID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Job'},
        messages: { type: String},
});

module.exports = mongoose.model('Chat',chatSchema);