import { customError } from "../error.js"
import CommentModel from "../models/Comment.js"
import VideoModel from "../models/Video.js"



export const addComment =async(req,res,next)=>{

try {
    const newComment =await  CommentModel.create({...req.body,userId:req.user.id})
    res.json(newComment)
} catch (error) {
    next(error)
}
}

export const deleteComment =async(req,res,next)=>{
    try {
    //identify User
        const comment = await CommentModel.findById(req.params.id)
        const video  = await VideoModel.findById(req.params.id)

        if(req.user.id === comment.userId || req.user.id === video.userId){
            await CommentModel.findByIdAndDelete(req.params.id)
            res.json("Comment is deleted").status(200)
        }else{
            next(customError(403,"You can delete only your Comments"))
        }


    } catch (error) {
            next(error)
    }   
}

export const getComments =async(req,res,next)=>{
    console.log(req.params);
    try {
        const comments = await  CommentModel.find({videoId:req.params.videoId})
        res.status(200).json(comments)
    } catch (error) {
        next(error)
    }
}
