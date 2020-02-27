const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bid = require('../models/bid.model');

router.get('/', (req, res, next) => {
    Bid.find()
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc.length > 0) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No Data Found'
                });
            }
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
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json(doc);
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
                message: "POST a Bid",
                postedBid: bid
            });
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
            res.status(200).json(result);
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
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;