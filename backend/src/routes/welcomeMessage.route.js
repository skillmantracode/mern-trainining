import express from "express"
import upload from "../config/multer.js"
import { createWelcomeMessage, getWelcomeMessage, updateWelcomeMessage } from "../controllers/welcomeMessage.controller.js"
const router=express.Router()


router.post("/",upload.single("image"),createWelcomeMessage)

router.get("/",getWelcomeMessage)

router.patch("/",upload.single("image"),updateWelcomeMessage)

export default router