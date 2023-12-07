const express = require("express")
const cors= require("cors")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { blogRouter } = require("./routes/blog.routes")
require("dotenv").config()


const app= express()
app.use(express.json())
app.use(cors())

app.use("/api",userRouter)
app.use("/api",blogRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to Blog App")
})


app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
})