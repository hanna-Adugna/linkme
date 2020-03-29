const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID:{ type: mongoose.Schema.Types.ObjectId, require: true, ref:'Job'},
    employeeID:{ type: mongoose.Schema.Types.ObjectId, require: true, ref:'Employee'},
    status:{ type: Boolean, require: true},
    description: String
});

module.exports = mongoose.model('Bid', bidSchema);