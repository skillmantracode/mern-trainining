import express from "express";

import {
  createNotice,
  getNotices,
  updateNotice,
  deleteNotice,
} from "../controllers/notice.controller.js";

import uploadNoticePdf from "../config/pdfMulter.js";

const router = express.Router();

// GET all notices
router.get("/", getNotices);

// CREATE notice
router.post("/", uploadNoticePdf.single("pdf"), createNotice);

// UPDATE notice
router.patch("/:id", uploadNoticePdf.single("pdf"), updateNotice);

// DELETE notice
router.delete("/:id", deleteNotice);

export default router;