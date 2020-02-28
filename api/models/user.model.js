const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    phoneNumber: String,
    email: String,
    userType: String,

    
});

module.exports = mongoose.model('User', userSchema);