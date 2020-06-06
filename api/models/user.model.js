const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, unique: true },
    password: { type: String, require: true},
    phoneNumber: { type: String, },
    email: { 
        type: String,
         require: true,
         unique: true,
         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    userType: { type: String, enum:['Admin','Employer','Employee'] },
    numberOfReport: { type: Number, default: 0 },
    profileImage: { type: String }

    
});

module.exports = mongoose.model('User', userSchema);