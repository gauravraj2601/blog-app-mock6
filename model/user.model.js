const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    username:String,
    avatar:String,
    email:String,
    password:String
},{
    versionKey:false
})

const User_Model= mongoose.model("users",userSchema)


module.exports={User_Model}