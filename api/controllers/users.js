const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// GET all users from model
exports.getAllUsers = (req, res, next) => {
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
                      url: process.env.URL +'/users/' + doc._id
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
// GET user data with specified ID
exports.getByID = (req,res,next) => {
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
                url: process.env.URL +'/users/' 
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
// POST (create) a user
exports.signupUser = (req, res, next) => {
    User.find({email: req.body.email, username: req.body.username })
    .exec()
    .then(user => {
        if(user.length >=1){
            return res.status(409).json({
                message: 'Data already exists'
            });
        }
        else{
            bcrypt.hash(req.body.password, 10 ,(err,hash) =>{
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash,
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
                            url: process.env.URL +'/users/' + result._id
                        }
        
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
            });
        }
    })
    
 
}
// Login
exports.loginUser = (req,res, next) => {
    User.find({email: req.body.email})
    .exec() 
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err ,result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                }); 
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY ,
                {
                    //options
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
             res.status(401).json({
                message: 'Auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err 
        });   
    });

}
// UPDATE
exports.updateUser = (req, res, next) => {
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
              url: process.env.URL +'/users/' + id
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
exports.deleteUser = (req, res, next) => {
    const id = req.params.userID;
    User.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'User deleted',
          request: {
              type: 'POST',
              url: process.env.URL +'/users/',
           
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