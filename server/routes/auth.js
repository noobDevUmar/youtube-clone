import express from 'express'
import { signUp,signin } from "../controllers/auth.js"

const router = express.Router()

// create A User

router.post('/signup',signUp)
// Sign In
router.post('/signin',signin)


// Google Auth 
// router.post('/googleauth',"")

export default router;