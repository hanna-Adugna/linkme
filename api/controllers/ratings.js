const mongoose = require('mongoose');

const Rating = require('../models/rating.model');

// GET all ratings from model
exports.getAllRatings = (req, res, next) => {
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
                    url: process.env.URL +'/ratings/' + doc._id
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
 
}
// GET ratings data with specified ID
exports.getByID = (req,res,next) => {
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
                url: process.env.URL +'/ratings/' 
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
}
// POST rate a user
exports.rateUser = (req, res, next) => {
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
                    url: process.env.URL +'/ratings/' + result._id
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
exports.updateRate = (req, res, next) => {
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
              url: process.env.URL +'/ratings/' + id
          }
      });
    })
    .catch(err => {
     console.log(err);
     res.status(500).json({ 
     error: err
        });
    });
  }
// DELETE
exports.deleteRate = (req, res, next) => {
    const id = req.params.ratingID;
    Rating.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'rating deleted',
          request: {
              type: 'POST',
              url: process.env.URL +'/ratings/',             
  
          }
      });
  })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
  }