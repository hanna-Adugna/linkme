 const User = require('../models/user.model');

const checkRole = role => (req, res,next)=>
{  User.find()
 .select('userType')
 .exec()
 .then(user => {
console.log(role)
if (role.includes(user[0].userType))
{   
  next();
}
else{
  res.status(401).json("Unauthorized")
}
})
.catch(err => {
  console.log(err);
  res.status(500).json({
      error: err 
  });   
});

}

module.exports = {
    checkRole
}