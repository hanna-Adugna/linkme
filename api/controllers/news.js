const mongoose = require('mongoose');

const News = require('../models/news.model');

// GET all news from model
exports.getAllNews = (req, res, next) => {
    News.find()
    .select()
    .exec()
    .then(docs =>{
        const response = {
            count: docs.length,
            news: docs.map(doc => {
                return{
                categoryID: doc.categoryID,
                news: doc.news,
                  _id: doc._id,
                  request: {
                      type: 'GET',
                      url: process.env.URL +'/news/' + doc._id
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
// GET news data with specified ID
exports.getByID = (req,res,next) => {
    const id = req.params.newsID;
    News.findById(id)
    .select()
    .exec()
    .then(doc => {
        console.log("From databse",doc);
        if(doc){
            res.status(200).json({
                news: doc,
                request: {
                type: 'GET',
                url: process.env.URL +'/news/' 
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
// POST (add) news
exports.addNews = (req, res, next) => {
    const news = new News({
        _id: new mongoose.Types.ObjectId(),
        categoryID: req.body.categoryID,
        news: req.body.news,

    });
    news
    .save()
    .then(result => { 
        console.log(result);
        res.status(201).json({
            message: "News added successfully",
            createdNews: {
                categoryID : result.categoryID,
                news : result.news,
                _id: result._id,
                request: {
                    type: 'Post',
                    url: process.env.URL +'/news/' + result._id
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
exports.updateNews = (req, res, next) => {
    const id = req.params.newsID;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    News.update({_id: id},{ $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
          message: 'news updated',
          request:{
              type: 'GET',
              url: process.env.URL +'/news/' + id
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
exports.deleteNews = (req, res, next) => {
    const id = req.params.newsID;
    News.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'News deleted',
            request: {
                type: 'POST',
                url: process.env.URL +'/news/',
                 
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