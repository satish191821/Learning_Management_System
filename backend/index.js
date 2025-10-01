import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
dotenv.config()

// create express app 
const port= process.env.PORT
const app=express()
app.use(express.json())// middleware
app.use(cookieParser())// middleware

app.use("/api/auth",authRouter)// for auth. checking 

app.get("/",(req,res)=>{
    res.send("Hello from server")
})

app.listen(port,()=>{
    console.log("server Started")
    connectDb()
})