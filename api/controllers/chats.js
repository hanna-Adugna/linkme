const mongoose = require('mongoose');

const Chat = require('../models/chat.model');

// GET all chats from model
exports.getAllChats = (req, res, next) => {
    Chat.find()
        .select('JobID messages')
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                chats: docs.map(doc => {
                    return{
                      JobID: doc.JobID,
                      messages: doc.messages,
                      _id: doc._id,
                      request: {
                          type: 'GET',
                          url: process.env.URL +'/chats/' + doc._id
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
            })
        });
}
// GET chats data with specified ID
exports.getByID = (req, res, next) => {
    const id = req.params.chatID;
    Chat.findById(id)
        .select('JobID messages')
        .exec()
        .then(doc => {
            console.log("response to GET request", doc);
            if(doc) {
                res.status(200).json({
                    chat: doc,
                    request: {
                    type: 'GET',
                    url: process.env.URL +'/chats/' 
                    }
    
                });
            }
            else {
                res.status(404).json({
                    message: 'No Data Found under Specified ID'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}
// POST (create) a chat
exports.createChat= (req, res, next) => {
    const chat = new Chat({
        _id: new mongoose.Types.ObjectId,
        JobID: req.body.JobID,
        messages: req.body.messages,
    });
    chat.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "chat created successfully",
                createdChat: {
                    JobID : result.JobID,
                    messages: result.messages,
                    _id: result._id,
                    request: {
                        type: 'Post',
                        url: process.env.URL +'/chats/' + result._id
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
exports.updateChat = (req, res, next) => {
    const id = req.params.chatID;
    const updateOps = {};

    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Chat.update(
        { _id: id }, { $set: updateOps }
    ).exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'chat updated',
                request:{
                    type: 'GET',
                    url: process.env.URL +'/chats/' + id
                }
            });
          })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
// DELETE
exports.deleteChat = (req, res, next) => {
    const id = req.params.chatID;

    Categories.remove({
        _id: id
    }).exec()
    .then(result => {
        res.status(200).json({
            message: 'chat deleted',
            request: {
                type: 'POST',
                url: process.env.URL +'/chats/',
            }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}