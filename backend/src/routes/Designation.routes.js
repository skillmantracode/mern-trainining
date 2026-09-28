import express from 'express'
import { createDesignation, deleteDesignation, getDesignation, updateDesignation } from '../controllers/designation.controller.js'

const router=express.Router()

router.post("/",createDesignation)

router.get("/",getDesignation)

router.patch("/:id",updateDesignation)

router.delete("/:id",deleteDesignation)


export default router