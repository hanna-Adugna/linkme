const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    profileID: mongoose.Schema.Types.ObjectId,
    ratingID: mongoose.Schema.Types.ObjectId,
    
});

module.exports = mongoose.model('Employee', employeeSchema);