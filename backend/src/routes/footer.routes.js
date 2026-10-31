
import express from "express";

import {
  createFooter,
  getFooter,
  updateFooter,
} from "../controllers/footer.controller.js";

const router = express.Router();

router.post("/", createFooter);
router.get("/", getFooter);
router.put("/", updateFooter);

export default router;
