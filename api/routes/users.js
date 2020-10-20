const express = require('express');
const router = express.Router();
const multer = require('multer');

// diskStorage = detailed way for a file to be stored 
const storage = multer.diskStorage({
    //cb ca''back
  destination: function(req, file, cb)
  { // for error null
      cb(null, './uploads/');
  },
  filename: function(req, file, cb)
  {
      cb(null, file.originalname);
  } 

});
const fileFilter = (req, file, cb)=>{
    
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
    {
        cb(null,true);
    }
    else
    {
        //reject a file by
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
//add  checkAuth,
router.get('/' , UserController.getAllUsers );
// single parse 1 file
router.post('/signup:role', UserController.signupUser);

router.post('/login', UserController.loginUser );

router.get("/:userID", checkAuth, UserController.getByID);

router.patch('/:userID',upload.single('profileImage'), UserController.updateUser );
//add  checkAuth,
router.delete('/:userID', UserController.deleteUser);

module.exports = router;    