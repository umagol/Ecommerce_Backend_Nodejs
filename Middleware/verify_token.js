const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  
    let token = req.header("Authorization");
    
    if (!token){
    return res.status(401).send("Access Denied");
    }

    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    } 
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({message:"Invalid Token"});
  }
};