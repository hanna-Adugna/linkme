const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, unique: true },
    firstname: [String],
    middlename: { type: String },
    lastname: { type: String },
    password: { type: String},
    email: { 
        type: String,
         require: true,
         unique: true,
         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        },
    userType: { type: String, enum:['Admin','Employer','Employee'] },
    numberOfReport: { type: Number, default: 0 },
    avatar: { type: String },
    freeTrial: { type: Number, defaul: 5 }

    
});

module.exports = mongoose.model('User', userSchema);