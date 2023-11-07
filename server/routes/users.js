import express from 'express'
import {deleteuser, dislikeVideo, getUser, likeVideo, sucribe, unsubcribe, update} from "../controllers/user.js"
const router = express.Router()
import { verifyToken } from '../VerifyToken.js'

// update a User
router.put("/:id",verifyToken,update)

//delete a user
router.delete("/:id",verifyToken,deleteuser)

// get a user
router.get("/:id",getUser)

// subcribe a user
router.put("/find/:id",sucribe)

//unsubcribe a user
router.put("/sub/:id",unsubcribe)

//like a video
router.put("/sub/:videoid",likeVideo)

//dislike a video
router.put("/:videoid",dislikeVideo)


export default router;