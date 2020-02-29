const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Rating = require('../models/rating.model');


router.get('/', (req, res, next) => {
    Rating.find().exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
 
});

router.post('/', (req, res, next) => {
    const rating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        bidID: req.body.bidID,
        userID: req.body.userID,
        points: req.body.points,
        comment: req.body.comment
    });
    rating
    .save().
    then(result => { 
        console.log(result);
        res.status(201).json({
            message: "rating",
            postedRating: rating
    })
})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err 
        });
    });
});
router.get("/:ratingID",(req,res,next) => {
    const id = req.params.ratingID;
    Rating.findById(id).exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json(doc);
        }
        else{
            res.status(404)
            .json({message: 'No valid entry found'});
        }
        res.status(200).json(doc);
 })
 .catch(err => {
    console.log(err);
    res.status(500).json({error:err});  
 });
});

router.patch('/:ratingID', (req, res, next) => {
  const id = req.params.ratingID;
  const updateOps = {};
  for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
  }
 Rating.update({_id: id},{ $set: updateOps })
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
   console.log(err);
   res.status(500).json({ 
   error: err
      });
  });
});

router.delete('/:ratingID', (req, res, next) => {
  const id = req.params.ratingID;
  Rating.remove({_id: id})
  .exec()
  .then(result => {
      res.status(200).json(result);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
});

module.exports = router;    