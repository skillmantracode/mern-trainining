import express from "express";

import {
  createHeroSlide,
  getHeroSlides,
  getHeroSlideById,
  updateHeroSlide,
  deleteHeroSlide,
} from "../controllers/hero.controller.js";
import upload from "../config/multer.js";

const router = express.Router();

// Create
router.post("/",  upload.single("bgImage"),createHeroSlide);

// Get all
router.get("/", getHeroSlides);

// Get single
router.get("/:id", getHeroSlideById);

// Update
router.put("/:id", upload.single("bgImage"), updateHeroSlide);

// Delete
router.delete("/:id", deleteHeroSlide);

export default router;