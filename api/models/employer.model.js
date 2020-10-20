const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'User'},
    interest: {type: Array, require:true }, 
    
});

module.exports = mongoose.model('Employer', employerSchema);