const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        categoryName: { type: String, require: true },
        categoryTitle: { type: String, require: true},
        questions: {type: Array, require: true},
        
});

module.exports = mongoose.model('Category',categorySchema);        