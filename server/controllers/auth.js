import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {customError} from "../error.js"

export const signUp =async (req,res,next)=>{

const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(req.body.password,salt)
try {
     const newUser =await  UserModel.create({...req.body,password:hash})
        res.json(newUser).status(200)
} catch (error) {
    next(error)
}


}
export const signin =async (req,res,next)=>{
    const {password,email} =req.body
    try {

        const user = await UserModel.findOne({email})
        if(!user) return next(customError(404,"User not found"))

        const isCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(!isCorrect) return next(customError(400,"Wrong Credentials"))

        const token = jwt.sign({id:user._id},process.env.Secret)

        const {password,...rest} = user._doc
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(rest)

    } catch (error) {
        next(error)
    }
}