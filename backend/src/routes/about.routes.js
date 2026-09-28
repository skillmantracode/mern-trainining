import express from "express";
import {
  createMiddleAbout,
  createUpperAbout,
  getMiddleAbout,
  getUpperAbout,
  updateMiddleAbout,
  updateUpperAbout,
} from "../controllers/about.controller.js";
const router = express.Router();

//upper part
router.post("/", createUpperAbout);

router.get("/", getUpperAbout);

router.patch("/", updateUpperAbout);

//middle part
router.post("/", createMiddleAbout);

router.get("/", getMiddleAbout);

router.patch("/", updateMiddleAbout);

export default router;
