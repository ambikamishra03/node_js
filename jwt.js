const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) =>{
   // check request headers has authorization or not
   const authorization = req.headers.authorization;
   if(!authorization)
       return res.status(401).json({error:"token not found"});
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"})

 try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded;
    next();
 } catch (error) {
    console.log(error);
    res.status(401).json({error:'Invalid token'});
    
 }
}



function generateToken(userData){
   // token expires after 60 sec
return jwt.sign({userData}, process.env.JWT_SECRET);
}
module.exports = {jwtAuthMiddleware,generateToken};