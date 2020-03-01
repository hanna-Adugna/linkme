const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.model');


router.get('/', (req, res, next) => {
    User.find()
    .select('username password phoneNumber email userType numberOfReport')
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            user: docs.map(doc => {
                return{
                  username: doc.username,
                  password: doc.password,
                  phoneNumber: doc.phoneNumber,
                  email: doc.email,
                  userType: doc.userType,
                  numberOfReport: doc.numberOfReport,
                   _id: doc._id,
                  request: {
                      type: 'GET',
                      url: 'http://localhost/3000/users/' + doc._id
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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        userType: req.body.userType,
        numberOfReport: req.body.numberOfReport,
    });
    user
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "User created successfully",
            createdUser: {
                username: req.body.username,
                password: req.body.password,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                userType: req.body.userType,
                numberOfReport: req.body.numberOfReport,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: 'http://localhost/3000/users/' + result._id
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
router.get("/:userID",(req,res,next) => {
    const id = req.params.userID;
    User.findById(id)
    .select('username password phoneNumber email userType numberOfReport')
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                user: doc,
                request: {
                type: 'GET',
                url: 'http://localhost/3000/users/' 
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
    res.status(200).json({
        message: 'User updated',
        request:{
            type: 'GET',
            url: 'http://localhost/3000/users/' + id
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

router.delete('/:userID', (req, res, next) => {
  const id = req.params.userID;
  User.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json({
        message: 'User deleted',
        request: {
            type: 'POST',
            url: 'http://localhost/3000/users/',
         
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