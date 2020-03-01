const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        userID: { type: mongoose.Schema.Types.ObjectId, require: true}
});

module.exports = mongoose.model('Admin',adminSchema);