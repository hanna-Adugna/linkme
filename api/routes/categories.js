const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET All Categories"
    });
});

router.post('/', (req, res, next) => {

    // Example of Parsing JSON request
    const category = {
        categoryName: req.body.categoryName
    };

    res.status(201).json({
        message: "POST a Category",
        category: category
    });
});

router.patch('/:categoryID', (req, res, next) => {
    res.status(200).json({
        message: "PATCH request",
        ID: req.params.categoryID
    });
});

router.delete('/:categoryID', (req, res, next) => {
    res.status(404).json({
        message: "DELETE request",
        ID: req.params.categoryID
    })
});

module.exports = router;