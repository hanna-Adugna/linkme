const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    skills: { type: String, require: true},
    expirence: { type: String, require: true},
    approval: { type: Boolean, require: true},
    
});

module.exports = mongoose.model('Profile', profileSchema);