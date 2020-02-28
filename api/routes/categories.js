const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category.model');

router.get('/', (req, res, next) => {
    Category.find()
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

router.get('/:categoryID', (req, res, next) => {
    const id = req.params.categoryID;
    Category.findById(id)
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
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        description: req.body.description
    });
    category.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "categories",
                postedCategories: category
            });
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
            res.status(200).json(result);
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
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;