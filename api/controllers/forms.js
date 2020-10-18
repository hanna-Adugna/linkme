const mongoose = require('mongoose');

const Form = require('../models/form.model');

// GET all forms from model
exports.getAllForms = (req, res, next) => {
    Form.find()
    .select()
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                forms: docs.map(doc => {
                    return{
                    categoryID: doc.categoryID,
                    type: doc.type,
                    duration: doc.duration,
                    location: doc.location,
                    price: doc.price,
                    filledQuestion: doc.filledQuestion,
                    employeeID: doc.employeeID,
                    employerID: doc.employerID,
                    confirmation: doc.confirmation,
                    jobMode: doc.jobMode,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: process.env.URL +'/forms/' + doc._id
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
// GET forms data with specified ID
exports.getByID =  (req, res, next) => {
    const id = req.params.formID;
    Form.findById(id)
        .select()
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc){
                res.status(200).json({
                    form: doc,
                    request: {
                    type: 'GET',
                    url: process.env.URL +'/forms/' 
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
// POST (create) a form
exports.createForm = (req, res, next) => {
 // what is it?
    const questionArray = req.body.questions;

    const form = new Form({
        _id: new mongoose.Types.ObjectId,
        categoryID:  req.body.categoryID,
        type:  req.body.type,
        duration:  req.body.duration,
        location:  req.body.location,
        price:  req.body.price,
        filledQuestion:  req.body.filledQuestion,
        employeeID:  req.body.employeeID,
        employerID:  req.body.employerID,
        confirmation:  req.body.confirmation,
        // if its public or private 
        jobMode:  req.body.jobMode,
    });

    form.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "form created successfully",
                createdform: {
                    categoryID:  result.categoryID,
                    type:  result.type,
                    duration:  result.duration,
                    location:  result.location,
                    price: result.price,
                    filledQuestion:  result.filledQuestion,
                    employeeID:  result.employeeID,
                    employerID: result.employerID,
                    confirmation:  result.confirmation,
                    jobMode:  result.jobMode,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: process.env.URL +'/forms/' + result._id
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
exports.updateForm = (req, res, next) => {
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
                    url: process.env.URL +'/forms/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
// DELETE
exports.deleteForm = (req, res, next) => {
    const id = req.params.formID;
   Form.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'form deleted',
            request: {
                type: 'POST',
                url: process.env.URL +'/forms/',
         
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}