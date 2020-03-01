const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, require: true},
    password: { type: String, require: true},
    phoneNumber: { type: String, require: true},
    email: { type: String, require: true},
    userType: { type: String, require: true},
    numberOfReport: { type: Number, require: true},

    
});

module.exports = mongoose.model('User', userSchema);