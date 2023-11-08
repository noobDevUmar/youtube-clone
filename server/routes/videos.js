import express from 'express'
import { AddVideo, addView, deleteVideo, getVideo, randomVideos, subcribedVideos, trendVideos, updateVideo } from "../controllers/video.js"
import { verifyToken } from '../VerifyToken.js';
const router = express.Router()

// Create a video

router.post("/",verifyToken,AddVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.get("/find/:id",getVideo)
router.put("/views/:id",addView)

router.get("/trend",trendVideos)
router.get("/random",randomVideos)
router.get("/sub",verifyToken,subcribedVideos)





export default router;