const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        userID: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('Admin',adminSchema);