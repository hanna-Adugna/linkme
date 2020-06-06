const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, require: true, ref:'User'},
    skill:  { type: String, require: true },
    experience: { type: String, require: true},
    // ratingID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Rating'}
    
});

module.exports = mongoose.model('Employee', employeeSchema);