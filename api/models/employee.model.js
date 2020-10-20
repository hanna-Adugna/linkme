const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, require: true, ref:'User'},
    skills: [String],
    experiences: { type: String, require: true},
    
});

module.exports = mongoose.model('Employee', employeeSchema);