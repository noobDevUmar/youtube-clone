import express from 'express'
import { addComment, deleteComment, getComments } from "../controllers/comment.js"
const router = express.Router()
import{verifyToken} from "../VerifyToken.js"


router.post("/",verifyToken,addComment);
router.delete('/:id',deleteComment)
router.get("/:videoId",getComments)

export default router;