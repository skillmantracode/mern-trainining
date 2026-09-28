import express from 'express'
import { createDepartment, deleteDepartment, getDepartment, updateDepartment } from '../controllers/department.controller.js'

const router=express.Router()

router.post("/",createDepartment)

router.get("/",getDepartment)

router.patch("/:id",updateDepartment)

router.delete("/:id",deleteDepartment)


export default router