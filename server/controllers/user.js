import { customError } from "../error.js"
import UserModel from "../models/User.js"
export const update = async (req,res,next)=>{
  console.log(req.user);
  if(req.params.id===req.user.id){

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true}) 
        if(!updatedUser) return next(customError(404,"User Not Found"))

        res.json(updatedUser)

    } catch (error) {
        next(error)
    }
  }else{
    return next(customError(400,"User not Authenticated"))
  }

}

export const deleteuser=async(req,res,next)=>{

  if(req.params.id===req.user.id){

    try {
      await UserModel.findByIdAndDelete(req.params.id) 
        
        res.json("user has been Deleted!")

    } catch (error) {
        next(error)
    }
  }else{
    return next(customError(400,"User not Authenticated"))
  }
}
export const getUser=async(req,res,next)=>{

}
export const sucribe=async(req,res,next)=>{

}
export const unsubcribe=async(req,res,next)=>{

}
export const likeVideo=async(req,res,next)=>{

}
export const dislikeVideo=async(req,res,next)=>{

}