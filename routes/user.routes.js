const express= require("express");
const userRouter= express.Router()
require("dotenv").config()
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken")
const { User_Model } = require("../model/user.model");


userRouter.post("/register", async(req,res)=>{
    const {username,email,password,avatar}= req.body;
    try {
        const user= await User_Model.findOne({email})
        if(user){
            return res.status(400).send({msg:"Please Login, user Already Exist"})
        }
        else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                // Store hash in your password DB.
                if(err){
                    return res.status(400).send({error:"hash error",err})
                }
                const newUser= new User_Model({username,email,avatar,password:hash})
                await newUser.save();
                res.status(200).send({msg:"New User Register "})
            });
        }
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email, password}= req.body;
    try {
        const user= await User_Model.findOne({email})
        if(!user){
            res.status(400).send({msg:"User Not found"})
        }
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(err){
                    return res.status(400).send({error:"bcrypt compare error",err})
                }
                if(result){
                    res.status(200).send({msg:"Login Successful",
                    "token":jwt.sign({ userId:user._id,username:user.username }, process.env.JWT_KEY)
                })
                }
            });
        }
        else{
            return res.status(400).send({error:"Wrong Credentials"})
        }
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})







module.exports={userRouter}