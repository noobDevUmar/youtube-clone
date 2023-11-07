import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"


const app = express()
dotenv.config()

const dbConnect=async()=>{

  try {
    await mongoose.connect(process.env.URI)
     console.log("Db connected");
  } catch (error) {
    throw error
  }
}

app.listen(3000,()=>{
    dbConnect()
})