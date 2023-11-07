import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("Db Connected");
  } catch (error) {
    console.log(error);
  }
};
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/videos',videoRoutes)
app.use('/api/comments',commentRoutes)

app.use((err,req,res,next)=>{
  const status = err.status || 500;
  const message = err.message || "Something went Wrong"

  return res.status(status).json({
    succeess:false,
    status,
    message
  })
})

app.listen(3000,()=>{
    dbConnect()
})