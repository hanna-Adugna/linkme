const mongoose = require('mongoose');

const Commission = require('../models/commission.model');

// GET all Commission from model
exports.getAllCommissions = (req, res, next) => {
    Commission.find()
        .select()
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                commissions: docs.map(doc => {
                    return{
                      JobID: doc.JobID,
                      amount: doc.amount,
                      adminID: doc.adminID,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: process.env.URL +'/Commissions/' + doc._id
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
}
// GET Commission data with specified ID
exports.getByID = (req, res, next) => {
    const id = req.params.commissionID;
    Commission.findById(id)
        .select()
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    Commission: doc,
                    request: {
                    type: 'GET',
                    url: process.env.URL +'/Commissions/' 
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
}
// POST (create) a Commission
exports.createCommission= (req, res, next) => {
    const commission = new Commissions({
        _id: new mongoose.Types.ObjectId,
        JobID: req.body.JobID,
        adminID: req.body.adminID,
        amount: req.body.amount,
    });
    commission.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "successfully",
                createdcommission: {
                    JobID : result.JobID,
                    adminID: result.adminID,
                    amount: result.amount,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: process.env.URL +'/commissions/' + result._id
                    }
    
                }
        })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
// UPDATE
exports.updateCommission = (req, res, next) => {
    const id = req.params.commissionID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Commission.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Commission updated',
                request:{
                    type: 'GET',
                    url: process.env.URL +'/Commissions/' + id
                }
            });
          })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
// DELETE
exports.deleteCommission = (req, res, next) => {
    const id = req.params.commissionID;

    Commission.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'Commission deleted',
            request: {
                type: 'POST',
                url: process.env.URL +'/Commissions/',
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}