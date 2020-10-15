const mongoose = require('mongoose');

const Job = require('../models/job.model');

// GET all jobd from model
exports.getAllJobs = (req, res, next) => {
    Job.find()
    .select('title duration')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            jobs: docs.map(doc => {
                return{
                formID: doc.formID,
                answerID: doc.answerID,
                jobStatus: doc.answerID,
                  _id: doc._id,
                  request: {
                      type: 'GET',
                      url: process.env.URL +'/jobs/' + doc._id
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
// GET jobd data with specified ID
exports.getByID = (req,res,next) => {
    const id = req.params.jobID;
    Job.findById(id)
    .select()
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                job: doc,
                request: {
                type: 'GET',
                url: process.env.URL +'/jobs/' 
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
}
// POST (create) a job
exports.createJob = (req, res, next) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        formID: req.body.formID,
        answerID: req.body.answerID,
        jobStatus: req.body.jobStatus

    });
    job
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "Job created successfully",
            createdJob: {
                formID : result.formID,
                answerID : result.answerID,
                jobStatus : result.jobStatus,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: process.env.URL +'/jobs/' + result._id
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
exports.updateJob = (req, res, next) => {
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
              url: process.env.URL +'/jobs/' + id
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
exports.deleteJob = (req, res, next) => {
    const id = req.params.jobID;
    Job.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Job deleted',
            request: {
                type: 'POST',
                url: process.env.URL +'/jobs/',
                 
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