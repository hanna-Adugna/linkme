const mongoose = require('mongoose');

const BankAccount = require('../models/bankAccount.model');

// GET all BankAccounts from model
exports.getAllBankAccounts = (req, res, next) => {
    BankAccount.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                BankAccounts: docs.map(doc => {
                    return{
                        userID: doc.userID,
                        accountNumber: doc.accountNumber,
                        balance: doc.balance,
                        password: doc.password,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: process.env.URL +'/BankAccounts/' + doc._id
                      }
                    }
                })
    
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

// GET BankAccounts data with specified ID
exports.getByID = (req, res, next) => {
    const id = req.params.BankAccountID;
    BankAccount.findById(id)
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    bid: doc,
                    request: {
                    type: 'GET',
                    url: process.env.URL +'/BankAccounts/' 
                    }
    
                });
            }
            else {
                res.status(404).json({
                    message: 'No Data Found under Specified ID'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

// POST (create) an BankAccounts
exports.createBankAccount = (req, res, next) => {
    const bankAccounts = new BankAccount({
        _id: new mongoose.Types.ObjectId,
        userID: req.body.userID,
        accountNumber: req.body.accountNumber,
        balance: req.body.balance,
        password: req.body.password
    });
    bankAccounts.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Bank sccount created successfully",
                createdBankAccounts: {
                    userID: result.body.userID,
                    accountNumber: result.body.accountNumber,
                    balance: result.body.balance,
                    password: result.body.password,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: process.env.URL +'/BankAccounts/' + result._id
                    }
    
                }
        });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// UPDATE
exports.updateBankAccount = (req, res, next) => {
    const id = req.params.BankAccountID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    BankAccount.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Bank account updated',
                request:{
                    type: 'GET',
                    url: process.env.URL + '/BankAccounts/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

// DELETE
exports.deleteBankAccount = (req, res, next) => {
    const id = req.params.BankAccountID;

    BankAccount.remove({
        _id: id
    }).exec()
        .then(result =>  {
            res.status(200).json({
                message: 'Bank account deleted',
                request: {
                    type: 'POST',
                    url: process.env.URL +'/BankAccounts/',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};