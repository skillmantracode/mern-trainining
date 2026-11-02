import express from "express";
import upload from "../config/multer.js";

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

// CREATE EVENT
router.post("/", upload.single("image"), createEvent);

// GET ALL EVENTS
router.get("/", getEvents);

// GET SINGLE EVENT
router.get("/:id", getEventById);

// UPDATE EVENT
router.put("/:id", upload.single("image"), updateEvent);

// DELETE EVENT
router.delete("/:id", deleteEvent);

export default router;