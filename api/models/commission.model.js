const mongoose = require('mongoose');

const commissionSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        jobID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Job'},
        adminID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Admin'},
        amount: { type: Number, require: true},
});

module.exports = mongoose.model('Commission',commissionSchema);