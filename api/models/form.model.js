const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    categoryID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'Category'},
    type: { type: String, require:true},
    duration: { type: String, require:true},
    location: { type: String, require:true},
    price: { type: Number, require:true},
    filledQuestion : { type: Array, require:true},
    //not required because if this form is for bidding he doesnt have to specify the employee id
    employeeID: {type: mongoose.Schema.Types.ObjectId, ref:'Employee'},
    employerID: {type: mongoose.Schema.Types.ObjectId, require: true, ref:'Employer'},
    //the comission depend on this attribute the optiones are null,pending,agree
    confirmation : {type: String },
    //if the job is public of private if its public it will appear publicly if 
    //not its for one employee like sending a message
    jobMode: { type: String, require:true},
});

module.exports = mongoose.model('Form', formSchema);