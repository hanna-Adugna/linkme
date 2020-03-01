const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, require: true},
    profileID: { type: mongoose.Schema.Types.ObjectId, require: true},
    ratingID: { type: mongoose.Schema.Types.ObjectId, require: true}
    
});

module.exports = mongoose.model('Employee', employeeSchema);