const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Answer = require('../models/answer.model');

router.get('/', (req, res, next) => {
    Answer.find()
        .select('formID answers')
        .exec()
        .then(doc => {
            const response = {
                count: docs.length,
                answers: docs.map(doc => {
                    return{
                      formID: doc.formID,
                      answers: doc.answers,
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

router.get('/:answerID', (req, res, next) => {
    const id = req.params.answerID;
    Answer.findById(id)
        .select('formID answers')
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    answer: doc,
                    request: {
                    type: 'GET',
                    url: 'http://localhost/3000/answers/' 
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
    const answer = new Answer({
        _id: new mongoose.Types.ObjectId,
        formID: req.body.formID,
        answers: req.body.answers
    });
    answer.save()
        .then(result => { 
            console.log(result);
            res.status(201).json({
                message: "answer created successfully",
                createdAnswer: {
                    formID : result.formID,
                    answers:result.answers,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: 'http://localhost/3000/answers/' + result._id
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

router.patch('/:answerID', (req, res, next) => {
    const id = req.params.answerID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Answer.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'answer updated',
                request:{
                    type: 'GET',
                    url: 'http://localhost/3000/answer/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:answerID', (req, res, next) => {
    const id = req.params.answerID;

    Answer.remove({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                message: 'answer deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost/3000/answers/',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;