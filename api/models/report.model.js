const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    numberOfUsers: mongoose.Schema.Types.ObjectId,
    sex: CharacterData,
    doneProjects: String,
    failedProjects: String,
    description: String,
    
});

module.exports = mongoose.model('Report', reportSchema);