const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID: mongoose.Schema.Types.ObjectId,
    employeeID: mongoose.Schema.Types.ObjectId,
    status: Boolean,
    description: String
});

module.exports = mongoose.model('Bid', bidSchema);