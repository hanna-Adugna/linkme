const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        user_ID: String
});

module.exports = mongoose.model('Admin',AdminSchema);