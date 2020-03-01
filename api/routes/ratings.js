const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Rating = require('../models/rating.model');


router.get('/', (req, res, next) => {
    Rating.find()
    .select('bidID userID points comment')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            rating: docs.map(doc => {
                return{
                    bidID: doc.bidID,
                    userID: doc.userID,
                    points: doc.points,
                    comment: doc.comment,
                    _id: doc._id,
                    request: {
                     type: 'GET',
                    url: 'http://localhost/3000/ratings/' + doc._id
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
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "rated successfully",
            rated: {
                bidID : result.bidID,
                userID:result.userID,
                points : result.points,
                comment:result.comment,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: 'http://localhost/3000/ratings/' + result._id
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
router.get("/:ratingID",(req,res,next) => {
    const id = req.params.ratingID;
    Rating.findById(id)
    .select('bidID userID points comment')
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                rating: doc,
                request: {
                type: 'GET',
                url: 'http://localhost/3000/ratings/' 
                }

            });
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
    res.status(200).json({
        message: 'rating updated',
        request:{
            type: 'GET',
            url: 'http://localhost/3000/ratings/' + id
        }
    });
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
    res.status(200).json({
        message: 'rating deleted',
        request: {
            type: 'POST',
            url: 'http://localhost/3000/ratings/',             

        }
    });
})
  .catch(err => {
      console.log(err);
      res.status(500).json({
          error: err
      });
  });
});

module.exports = router;    