import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
dotenv.config()

// create express app 
const port= process.env.PORT
const app=express()
app.use(express.json())// middleware
app.use(cookieParser())// middleware



app.get("/",(req,res)=>{
    res.send("Hello from server")
})

app.listen(port,()=>{
    console.log("server Started")
    connectDb()
})