const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        title: { type: String, require: true},
        category_ID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Category'},
        type: { type: String, require: true},
        duration: { type: String, require: true},
        price:{ type:Number, require: true},
        location:{ type: String, require: true},
        description: String 
});

module.exports = mongoose.model('Job',jobSchema);