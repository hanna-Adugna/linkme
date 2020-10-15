const mongoose = require('mongoose');

const Answer = require('../models/answer.model');

// GET all Answers from model
exports.getAllAnswers = (req, res, next) => {
    //.find().where or limit for pagination
    Answer.find()
    // to get true promise
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                // map is to get indivisual doc
                answers: docs.map(doc => {
                    return{
                        formID: doc.formID,
                        employeeID: doc.employeeID,
                        type: doc.type,
                        duration: doc.duration,
                        location: doc.location,
                        price: doc.price,
                        status: doc.status,
                        confirmation: doc.confirmation,
                        filledQuestion: doc.filledQuestion,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: process.env.URL +'/answers/' + doc._id
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

// GET Answer data with specified ID
exports.getByID = (req, res, next) => {
    const id = req.params.answerID;
    Answer.findById(id)
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    answer: doc,
                    request: {
                    type: 'GET',
                    url: process.env.URL +'/answers/' 
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

// POST (create) an Answer
exports.createAnswer = (req, res, next) => {
    const answer = new Answer({
        _id: new mongoose.Types.ObjectId,
        formID:  req.body.formID,
        employeeID:  req.body.employeeID,
        type:  req.body.type,
        duration:  req.body.duration,
        location:  req.body.location,
        price:  req.body.price,
        status:  req.body.status,
        confirmation:  req.body.confirmation,
        filledQuestion:  req.body.filledQuestion,
    });
    answer.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "answer created successfully",
                createdAnswer: {
                    formID: result.formID,
                    employeeID: result.employeeID,
                    type: result.type,
                    duration: result.duration,
                    location: result.location,
                    price: result.price,
                    status: result.status,
                    confirmation: result.confirmation,
                    filledQuestion: result.filledQuestion,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: process.env.URL +'/answers/' + result._id
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
exports.updateAnswer = (req, res, next) => {
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
                    url: process.env.URL + '/answers/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};

// DELETE
exports.deleteAnswer = (req, res, next) => {
    const id = req.params.answerID;

    Answer.remove({
        _id: id
    }).exec()
        .then(result =>  {
            res.status(200).json({
                message: 'answers deleted',
                request: {
                    type: 'POST',
                    url: process.env.URL +'/answers/',
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
};