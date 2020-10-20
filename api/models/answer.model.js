const mongoose = require('mongoose');

const answerSchema = mongoose.Schema({
        //serial ID (long string)
        _id: mongoose.Schema.Types.ObjectId,
        // formID: { type: mongoose.Schema.Types.ObjectId,require: true, ref:'Form' },
        // employeeID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Employee' },
        // type: { type: String, require:true},
        duration: { type: String, require:true},
        location: { type: String, require:true},
        // price: { type: Number, require:true},
        // //this is for the bid if this answer is selected by the bid poster
        // status: {type: Boolean},
        // //the comission depend on this attribute the optiones are null,pending,agree
        // confirmation : {type: String },
        filledQuestion : { type: Array, require:true},
});

module.exports = mongoose.model('Answer',answerSchema);