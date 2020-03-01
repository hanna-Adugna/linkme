const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category.model');

router.get('/', (req, res, next) => {
    Category.find()
        .select('name description')
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                categories: docs.map(doc => {
                    return{
                      name: doc.name,
                      description: doc.description,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: 'http://localhost/3000/categories/' + doc._id
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

router.get('/:categoryID', (req, res, next) => {
    const id = req.params.categoryID;
    Category.findById(id)
        .select('name description')
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    category: doc,
                    request: {
                    type: 'GET',
                    url: 'http://localhost/3000/categories/' 
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
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        description: req.body.description
    });
    category.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "category created successfully",
                createdCategory: {
                    name : result.name,
                    description: result.description,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: 'http://localhost/3000/categories/' + result._id
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

router.patch('/:categoriesID', (req, res, next) => {
    const id = req.params.categoriesID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Categories.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'category updated',
                request:{
                    type: 'GET',
                    url: 'http://localhost/3000/categories/' + id
                }
            });
          })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:categoriesID', (req, res, next) => {
    const id = req.params.categoriesID;

    Categories.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'category deleted',
            request: {
                type: 'POST',
                url: 'http://localhost/3000/categories/',
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;