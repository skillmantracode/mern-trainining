import express from "express";
import upload from "../config/multer.js";
import {
  createLowAboutPart,
  createMiddleAbout,
  createUpperAbout,
  getLowAboutPart,
  getMiddleAbout,
  getUpperAbout,
  updateLowAboutPart,
  updateMiddleAbout,
  updateUpperAbout,
} from "../controllers/about.controller.js";

const router = express.Router();

// Upper Part
router.post("/upper", createUpperAbout);
router.get("/upper", getUpperAbout);
router.patch("/upper", updateUpperAbout);

// Middle Part
router.post("/middle", upload.single("image"), createMiddleAbout);
router.get("/middle", getMiddleAbout);
router.patch("/middle", upload.single("campusBanner"), updateMiddleAbout); 

// Lower Part
router.post("/lower", createLowAboutPart);
router.get("/lower", getLowAboutPart);
router.patch("/lower", updateLowAboutPart);

export default router;