const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'User'},
    ratingID:{ type: mongoose.Schema.Types.ObjectId, require: true, ref:'Rating' }, 
    
});

module.exports = mongoose.model('Employer', employerSchema);