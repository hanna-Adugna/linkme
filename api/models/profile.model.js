const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    skills: String,
    expirence: String,
    approval: Boolean,
    
});

module.exports = mongoose.model('Profile', profileSchema);