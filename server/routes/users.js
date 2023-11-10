import express from 'express'
import {deleteuser, dislikeVideo, getUser, likeVideo, sucribe, unsubcribe, update} from "../controllers/user.js"
const router = express.Router()
import { verifyToken } from '../VerifyToken.js'

// update a User
router.put("/:id",verifyToken,update)

//delete a user
router.delete("/:id",verifyToken,deleteuser)

// get a user
router.get("/find/:id",getUser)

// subcribe a user
router.put("/sub/:id",verifyToken,sucribe)

//unsubcribe a user
router.put("/unsub/:id",verifyToken,unsubcribe)

//like a video
router.put("/like/:videoId",verifyToken,likeVideo)

//dislike a video
router.put("/dislike/:videoId",verifyToken,dislikeVideo)


export default router;