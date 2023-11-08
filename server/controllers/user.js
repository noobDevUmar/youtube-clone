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

  try {

    const user= await UserModel.findById(req.params.id)
    if(!user) return next(customError(404,"User not found!"))
    res.status(200).json(user)


  } catch (error) {
    next(error)
  }
}


// we Have to subcribe a user so its channels ID , and will  have to increase their Subcriber count
export const sucribe=async(req,res,next)=>{
  console.log(req.params.id);
try {

  // Subcribe to a Channel and Added in my subcribe Channels List , PARAMS.ID is the channels ID
  await UserModel.findByIdAndUpdate(
    req.user.id,
    { $push: { subscribedChannels: req.params.id }}
  );
  await UserModel.findByIdAndUpdate(req.params.id,{
    $inc:{subscribers:1}
  })


  res.status(200).json("Subscribed")
} catch (error) {
  next(error)
}
}
export const unsubcribe=async(req,res,next)=>{
  try {

    // Subcribe to a Channel and Added in my subcribe Channels List , PARAMS.ID is the channels ID
    await UserModel.findByIdAndUpdate(req.user.id,{
      $pull:{subscribedChannels:req.params.id}
    })
  
    // Increase Channels Subcriber count of that channel
    await UserModel.findByIdAndUpdate(req.params.id,{
      $inc:{subscribers:-1}
    })
    
  res.status(200).json("UnSubcribed")
    
  } catch (error) {
    next(error)
  }
}
export const likeVideo=async(req,res,next)=>{

}
export const dislikeVideo=async(req,res,next)=>{

}