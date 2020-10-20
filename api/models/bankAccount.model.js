const mongoose = require('mongoose');

const bankAccountSchema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        userID: { type: mongoose.Schema.Types.ObjectId, require: true, ref:'User'},
        accountNumber: { type: Number,require: true},
        balance: { type: Number,default : 0},
        password: { type: String,require: true},
});

module.exports = mongoose.model('BankAccount',bankAccountSchema);