import express from 'express'
import { createSyllbus, deleteSyllbus, getSyllbus, updateSyllbus } from '../controllers/syllabus.controller.js'
const router=express.Router()

router.post("/",createSyllbus)
router.get("/",getSyllbus)
router.patch("/",updateSyllbus)
router.delete("/",deleteSyllbus)

export default router