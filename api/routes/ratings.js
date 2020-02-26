const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET All Ratings"
    });
});

router.post('/', (req, res, next) => {

    // Example of Parsing JSON request
    let rating = {
        userID: req.body.userID,
        stars: req.body.stars
    };

    res.status(201).json({
        message: "POST a Rating",
        postedBid: bid
    });
});

module.exports = router;