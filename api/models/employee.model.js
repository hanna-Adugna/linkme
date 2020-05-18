const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, require: true, ref:'User'},
    skils:  { type: String, require: true },
    experience: { type: String, require: true},
    // profileID: { type: mongoose.Schema.Types.ObjectId, require: false, ref:'Profile'},
    // ratingID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Rating'}
    
});

module.exports = mongoose.model('Employee', employeeSchema);