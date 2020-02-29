const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Form = require('../models/form.model');

router.get('/', (req, res, next) => {
    Form.find()
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

router.get('/:formID', (req, res, next) => {
    const id = req.params.formID;
    Form.findById(id)
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
    const form = new Form({
        _id: new mongoose.Types.ObjectId,
        jobID: req.body.jobID,
        questions: req.body.questions
    });
    form.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "forms",
                postedForm: form
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:formID', (req, res, next) => {
    const id = req.params.formID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Form.update(
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

router.delete('/:formID', (req, res, next) => {
    const id = req.params.formID;

    Form.remove({
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