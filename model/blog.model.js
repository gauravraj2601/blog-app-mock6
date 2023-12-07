const mongoose= require("mongoose");

const blogSchema=mongoose.Schema({
    username:String,
    title:String,
    content:String,
    date:String,
    likes:Number,
    comments:Array
})

const Blog_Model= mongoose.model("blogs",blogSchema)

module.exports={
    Blog_Model
}