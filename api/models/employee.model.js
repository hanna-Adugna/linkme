const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'User'},
    profileID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Profile'},
    ratingID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Rating'}
    
});

module.exports = mongoose.model('Employee', employeeSchema);