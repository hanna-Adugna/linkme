const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Form = require('../models/form.model');

router.get('/', (req, res, next) => {
    Form.find()
    .select('jobID questions')
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                forms: docs.map(doc => {
                    return{
                      jobID: doc.jobID,
                      questions: doc.questions,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: 'http://localhost/3000/forms/' + doc._id
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

router.get('/:formID', (req, res, next) => {
    const id = req.params.formID;
    Form.findById(id)
        .select('jobID questions')
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc){
                res.status(200).json({
                    form: doc,
                    request: {
                    type: 'GET',
                    url: 'http://localhost/3000/forms/' 
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
    const form = new Form({
        _id: new mongoose.Types.ObjectId,
        jobID: req.body.jobID,
        questions: req.body.questions
    });
    form.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "form created successfully",
                createdform: {
                    jobID : result.jobID,
                    questions:result.questions,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: 'http://localhost/3000/forms/' + result._id
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
            res.status(200).json({
                message: 'form updated',
                request:{
                    type: 'GET',
                    url: 'http://localhost/3000/forms/' + id
                }
            });
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
        res.status(200).json({
            message: 'form deleted',
            request: {
                type: 'POST',
                url: 'http://localhost/3000/forms/',
         
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;