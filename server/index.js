import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import useRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"

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