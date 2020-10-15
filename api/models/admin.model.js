const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        userID: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' }
});

module.exports = mongoose.model('Admin',adminSchema);