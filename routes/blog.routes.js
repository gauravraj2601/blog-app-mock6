const express= require("express");
const { Blog_Model } = require("../model/blog.model");
const { auth } = require("../middleware/auth.middleware");


const blogRouter= express.Router();


blogRouter.post("/blogs",auth,async(req,res)=>{
    const payload= req.body
    try {
        const blog= new Blog_Model(payload)
        await blog.save();
        res.status(200).send({msg:"A new Blog Created"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

blogRouter.get("/blogs", async(req,res)=>{
    try {
        const blogs= await Blog_Model.find();
        res.status(200).send(blogs)
    } catch (error) {
        res.status(400).send({error:error.message})
        
    }
})





module.exports={blogRouter}