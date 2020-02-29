const mongoose = require('mongoose');

const reportedSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: mongoose.Schema.Types.ObjectId,
    numberOfReports: String,
   
});

module.exports = mongoose.model('Reported', reportedSchema);