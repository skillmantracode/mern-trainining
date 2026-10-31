
import express from "express";

import {
  createSyllabus,
  getSyllabus,
  getSyllabusById,
  updateSyllabus,
  deleteSyllabus,
} from "../controllers/syllabus.controller.js";

import uploadSyllabus from "../config/syllabus.js";

const router = express.Router();

// GET all syllabus
router.get("/", getSyllabus);

// GET syllabus by ID
router.get("/:id", getSyllabusById);

// CREATE syllabus
router.post("/", uploadSyllabus.single("pdf"), createSyllabus);

// UPDATE syllabus
router.patch("/:id", uploadSyllabus.single("pdf"), updateSyllabus);

// DELETE syllabus
router.delete("/:id", deleteSyllabus);

export default router;
