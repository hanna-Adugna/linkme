const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.model');


router.get('/', (req, res, next) => {
    User.find().exec()
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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        userType: req.body.userType,
    });
    user
    .save().
    then(result => { 
        console.log(result);
        res.status(201).json({
            message: "POST a User",
            postedUser: user
    })
})
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err 
        });
    });
});
router.get("/:userID",(req,res,next) => {
    const id = req.params.userID;
    User.findById(id).exec()
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

router.patch('/:userID', (req, res, next) => {
  const id = req.params.userID;
  const updateOps = {};
  for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
  }
  User.update({_id: id},{ $set: updateOps })
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

router.delete('/:userID', (req, res, next) => {
  const id = req.params.userID;
  User.remove({_id: id})
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