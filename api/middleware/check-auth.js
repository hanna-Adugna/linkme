const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        //get token from the header we dont need to parse the body to get the header
    const token = req.headers.authorization.split(" ")[1];
    // verify will decode the token and check it's validity 
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
    }catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

};