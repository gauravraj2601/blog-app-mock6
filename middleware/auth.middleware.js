const jwt= require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new Error("Not authorized to access this")
    }
    if(token){
        jwt.verify(token,  process.env.JWT_KEY, (err, decoded)=> {
            if(decoded){
                req.body.userId=decoded.userId
                req.body.username= decoded.username
                next()
            }
            else{
                res.send({"err":err})
            }
          });
    }
    else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={auth}