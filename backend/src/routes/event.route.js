import express from 'express'
import { createFirstEvent, createSecondEvent, deleteFirstEvent, deleteSecondEvent, getFirstEvent, getSecondEvent, updateSecondEvent } from '../controllers/event.controller.js'
const router=express.Router()

router.post("/",createFirstEvent)
router.get("/",getFirstEvent)
router.delete("/:id",deleteFirstEvent)


router.post("/",createSecondEvent)
router.delete("/:id",deleteSecondEvent)
router.patch("/:id",updateSecondEvent)
router.get("/",getSecondEvent)

export default router