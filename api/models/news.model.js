const mongoose = require('mongoose');

const newsSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        categoryID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Category'},
        news: { type: String},
});

module.exports = mongoose.model('News',newsSchema);