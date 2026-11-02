
import express from "express";

import {
  createProgram,
  getPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from "../controllers/program.controller.js";

import uploadProgramImage from "../middlewares/programUpload.middleware.js";

const router = express.Router();

router.post("/", uploadProgramImage.single("image"), createProgram);

router.get("/", getPrograms);

router.get("/:id", getProgramById);

router.patch("/:id", uploadProgramImage.single("image"), updateProgram);

router.delete("/:id", deleteProgram);

export default router;
