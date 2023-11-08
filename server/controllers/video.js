import { customError } from "../error.js"
import Video from "../models/Video.js"
import VideoModel from "../models/Video.js"
import UserModel from "../models/User.js"

export const AddVideo = async(req,res,next)=>{
    try {
    const newVideo = await VideoModel.create({userId:req.user.id,...req.body})
        res.status(200).json(newVideo)
} catch (error) {
    next(error)
}
}
export const updateVideo = async(req,res,next)=>{
    try {
        const video = await VideoModel.findById(req.params.id)
        if(!video) return next(customError(404,"Video not Found"))
        if(req.user.id === video.userId){
            const updatedVideo =await VideoModel.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updatedVideo)
        }else{
            next(customError(403,"you can update only your Video!"))
        }
    } catch (error) {
        next(error)
    }


}
export const deleteVideo = async(req,res,next)=>{
    try {
        const video = await VideoModel.findById(req.params.id)
        if(!video) return next(customError(404,"Video not Found"))
        if(req.user.id === video.userId){
          await VideoModel.findByIdAndDelete(req.params.id)
            res.status(200).json("Video Deleted")
        }else{
            next(customError(403,"you can delete only your Video!"))
        }
    } catch (error) {
        next(error)
    }
}
export const getVideo = async(req,res,next)=>{
    try {
        const video = await VideoModel.findById(req.params.id)
        if(!video) return next(customError(404,"Video Not Found"))

        res.json(video)
        
    } catch (error) {
        next(error)
    }
}


export const addView = async(req,res,next)=>{

    //  Find the video and increment views
    try {
        await VideoModel.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
        })
        
        res.json("View Added")
        
    } catch (error) {
        next(error)
    }
}



export const trendVideos = async(req,res,next)=>{
    try {
        const trendVideos = await VideoModel.find({}).sort({views:-1})

        res.json(trendVideos)
        
    } catch (error) {
        next(error)
    }
}


export const randomVideos = async(req,res,next)=>{
    try {
        const randomVideos = await VideoModel.aggregate([{$sample:{size:40}}])
 
        res.json(randomVideos)
        
    } catch (error) {
        next(error)
    }
}


export const subcribedVideos = async(req,res,next)=>{
    try {
        const user=await UserModel.findById(req.user.id)
        const subscribedChannelss= user.subscribedChannels;

        const list = await Promise.all(
            subscribedChannelss.map((channelId)=>{
                return VideoModel.find({userId:channelId})
            })
        )
        // flat method is to prevent nested array that we are getting in List response
        // sort is used for latest videos
        res.json(list.flat().sort((a,b)=>b.createdAt - a.createdAt)).status(200)

    } catch (error) {
        next(error)
    }
}