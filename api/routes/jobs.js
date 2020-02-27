const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Job = require('../models/job.model');


router.get('/', (req, res, next) => {
    Job.find().exec()
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
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        duration: req.body.duration
    });
    job
    .save().
    then(result => { 
        console.log(result);
        res.status(201).json({
            message: "POST a Job",
            postedJob: result
    })
})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err 
        });
    });
});
router.get("/:jobID",(req,res,next) => {
    const id = req.params.jobID;
    Job.findById(id).exec()
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

router.patch('/:jobID', (req, res, next) => {
  const id = req.params.jobID;
  const updateOps = {};
  for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
  }
  Job.update({_id: id},{ $set: updateOps })
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

router.delete('/:jobID', (req, res, next) => {
  const id = req.params.jobID;
  Job.remove({_id: id})
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