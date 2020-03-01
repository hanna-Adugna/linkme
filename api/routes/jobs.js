const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Job = require('../models/job.model');


router.get('/', (req, res, next) => {
    Job.find()
    .select('title duration')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            jobs: docs.map(doc => {
                return{
                  title: doc.title,
                  duration: doc.duration,
                  _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost/3000/jobs/' + doc._id
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
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        duration: req.body.duration
    });
    job
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "Job created successfully",
            createdJob: {
                title : result.title,
                duration:result.duration,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: 'http://localhost/3000/jobs/' + result._id
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
router.get("/:jobID",(req,res,next) => {
    const id = req.params.jobID;
    Job.findById(id)
    .select('title duration')
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                job: doc,
                request: {
                type: 'GET',
                url: 'http://localhost/3000/jobs/' 
                }

            });
        }
        else{
            res.status(404)
            .json({message: 'No Data Found under Specified ID'});
        }
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
    res.status(200).json({
        message: 'Job updated',
        request:{
            type: 'GET',
            url: 'http://localhost/3000/jobs/' + id
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

router.delete('/:jobID', (req, res, next) => {
  const id = req.params.jobID;
  Job.remove({_id: id})
  .exec()
  .then(result => {
      res.status(200).json({
          message: 'Job deleted',
          request: {
              type: 'POST',
              url: 'http://localhost/3000/jobs/',
              body: {title: 'String', duration: 'Number'}
               

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