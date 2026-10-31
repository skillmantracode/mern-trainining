
import express from "express";

import {
  createGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
} from "../controllers/gallery.controller.js";

import {
  createGalleryCategory,
  getGalleryCategories,
  deleteGalleryCategory,
} from "../controllers/galleryCategory.controller.js";

import uploadGalleryImage from "../middlewares/galleryUpload.middleware.js";

const router = express.Router();

// ==============================
// GALLERY CATEGORY ROUTES
// ==============================

router.get("/categories/all", getGalleryCategories);

router.post("/categories", createGalleryCategory);

router.delete("/categories/:id", deleteGalleryCategory);

// ==============================
// GALLERY CRUD ROUTES
// ==============================

router.get("/", getGalleries);

router.get("/:id", getGalleryById);

router.post(
  "/",
  uploadGalleryImage.single("image"),
  createGallery
);

router.patch(
  "/:id",
  uploadGalleryImage.single("image"),
  updateGallery
);

router.delete("/:id", deleteGallery);

export default router;
