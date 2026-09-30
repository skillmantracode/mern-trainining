import express from "express";
import {
  postReasonHeading,
  updateReasonHeading,
  postChooseReason,
  deleteChooseReason,
  updateChooseReason,
  getReasonHeading,
  getChooseReason,
  getChooseReasonById,
} from "../controllers/choose.reason.controller.js";
const router = express.Router();

router.post("/heading", postReasonHeading);
router.get("/heading",getReasonHeading)
router.get("/",getChooseReason)
router.get("/:id",getChooseReasonById)
router.patch("/heading", updateReasonHeading);

router.post("/", postChooseReason);

router.delete("/:reasonId", deleteChooseReason);

router.patch("/:reasonId", updateChooseReason);

export default router;
