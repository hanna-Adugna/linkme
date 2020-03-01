const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bid = require('../models/bid.model');

router.get('/', (req, res, next) => {
    Bid.find()
        .select('jobID employeeID status description')
        .exec()
        .then(doc => {
            const response = {
                count: docs.length,
                bids: docs.map(doc => {
                    return{
                        jobID: doc.jobID,
                        employeeID: doc.employeeID,
                        status: doc.status,
                        description: doc.description,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: 'http://localhost/3000/bids/' + doc._id
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
});

router.get('/:bidID', (req, res, next) => {
    const id = req.params.bidID;
    Bid.findById(id)
        .select('jobID employeeID status description')
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    bid: doc,
                    request: {
                    type: 'GET',
                    url: 'http://localhost/3000/bids/' 
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
});

router.post('/', (req, res, next) => {
    const bid = new Bid({
        _id: new mongoose.Types.ObjectId,
        jobID: req.body.jobID,
        employeeID: req.body.employeeID,
        status: req.body.status,
        description: req.body.description
    });
    bid.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Bid created successfully",
                createdBid: {
                    jobID : result.jobID,
                    employeeID:result.employeeID,
                    status : result.status,
                    description:result.description,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: 'http://localhost/3000/bids/' + result._id
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
});

router.patch('/:bidID', (req, res, next) => {
    const id = req.params.bidID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Bid.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Bid updated',
                request:{
                    type: 'GET',
                    url: 'http://localhost/3000/bids/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:bidID', (req, res, next) => {
    const id = req.params.bidID;

    Bid.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                message: 'Bid deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost/3000/bids/',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;