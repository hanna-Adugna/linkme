const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "GET All Bids"
    });
});

router.post('/', (req, res, next) => {

    // Example of Parsing JSON request
    let bid = {
        title: req.body.title,
        price: req.body.price
    };

    res.status(201).json({
        message: "POST a Bid",
        postedBid: bid
    });
});

router.patch('/:bidID', (req, res, next) => {
   res.status(200).json({
       message: "PATCH request",
       ID: req.params.bidID
   });
});

router.delete('/:bidID', (req, res, next) => {
    res.status(404).json({
        message: "DELETE request",
        ID: req.params.bidID
    })
});

module.exports = router;