const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb)
  {
      cb(null, './uploads/');
  },
  filename: function(req, file, cb)
  {
      cb(null, file.originalname);
  } 

});
const fileFilter = (req, file, cb)=>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null,true);
    }
    else
    {
    cb(null,false);
    cb(new Error('File not supported'));  
    }
 }
const upload = multer({
    storage: storage,
     limits:{
    // accept file only upto 5mb
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 });

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/users')

router.get('/' , checkAuth, UserController.getAllUsers );

router.post('/signup:role', upload.single('profileImage'), UserController.signupUser);

router.post('/login', UserController.loginUser );

router.get("/:userID", UserController.getByID);

router.patch('/:userID',upload.single('profileImage'), UserController.updateUser );

router.delete('/:userID',checkAuth, UserController.deleteUser);

module.exports = router;    