const mongoose = require('mongoose');

const Feedback = require('../models/feedback.model');

// GET all ratings from model
exports.getAllFeedbacks = (req, res, next) => {
    Feedback.find()
    .select('jobID from to points comment')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            feedback: docs.map(doc => {
                return{
                    jobID: doc.jobID,
                    from: doc.from,
                    to: doc.to,
                    points :doc.points,
                    comment: doc.comment,
                    _id: doc._id,
                    request: {
                     type: 'GET',
                    url: process.env.URL +'/feedbacks/' + doc._id
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
    const id = req.params.feedbackID;
    Feedback.findById(id)
    .select('jobID from to points comment')
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                rating: doc,
                request: {
                type: 'GET',
                url: process.env.URL +'/feedbacks/' 
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
exports.giveFeedbacks = (req, res, next) => {
    const feedback = new Feedback({
        _id: new mongoose.Types.ObjectId(),
        jobID: req.body.jobID,
        from: req.body.from,
        to: req.body.to,
        points: req.body.points,
        comment: req.body.comment
    });
    feedback
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "rated successfully",
            rated: {
                jobID: result.jobID,
                from: result.from,
                to: result.to,
                points: result.points,
                comment: result.comment,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: process.env.URL +'/feedbacks/' + result._id
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
exports.updateFeedback = (req, res, next) => {
    const id = req.params.feedbackID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
   Feedback.update({_id: id},{ $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
          message: 'feedback updated',
          request:{
              type: 'GET',
              url: process.env.URL +'/feedbacks/' + id
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
exports.deleteFeedback = (req, res, next) => {
    const id = req.params.feedbackID;
    Feedback.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'feedback deleted',
          request: {
              type: 'POST',
              url: process.env.URL +'/feedbacks/',             
  
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