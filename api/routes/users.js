const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET request for Users"
    })
});

router.get('/:userType', (req, res, next) => {
    res.status(200).json({
        message: "GET request for Users with userType",
        userType: req.params.userType
    })
});

router.post('/', (req, res, next) => {
    let user = {
        name: req.body.name,
        userName: req.body.userName,
        userType: req.body.userType
    };

    res.status(201).json({
        message: "POST request to /users",
        user: user
    });
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: "PATCH request for User",
        ID: req.params.id
    })
});

router.delete('/:id', (req, res, next) => {
    res.status(200).json({
        message: "DELETE request for User",
        ID: req.params.id
    })
});

module.exports = router;