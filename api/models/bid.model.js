const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    jobID:{ type: mongoose.Schema.Types.ObjectId, require: true},
    employeeID:{ type: mongoose.Schema.Types.ObjectId, require: true},
    status:{ type: Boolean, require: true},
    description: String
});

module.exports = mongoose.model('Bid', bidSchema);