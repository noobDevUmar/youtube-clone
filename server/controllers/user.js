import { customError } from "../error.js"
import UserModel from "../models/User.js"
export const update = async (req,res,next)=>{
  
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

export const deleteuser=(req,res,next)=>{

}
export const getUser=(req,res,next)=>{

}
export const sucribe=(req,res,next)=>{

}
export const unsubcribe=(req,res,next)=>{

}
export const likeVideo=(req,res,next)=>{

}
export const dislikeVideo=(req,res,next)=>{

}