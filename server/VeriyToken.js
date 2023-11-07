import jwt from "jsonwebtoken"
import {customError} from "./error.js"

export const verifyToken = (req,res,next)=>{
    const token =req.cookies.access_token
    if(!token) return next(customError(404,"you are not authenticated!"))


    jwt.verify(token,process.env.secret,(err,user)=>{
        if(err) return next(customError(403,"Token is not valid"))

        req.user= user
        next()
    })
}