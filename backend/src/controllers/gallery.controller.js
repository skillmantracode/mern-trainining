
import Gallery from "../models/gallery.model.js";
import GalleryCategory from "../models/galleryCategory.model.js";
import fs from "fs/promises";
import path from "path";

// ==============================
// HELPER: DELETE GALLERY IMAGE
// ==============================
const removeGalleryImage = async (imagePath) => {
  if (!imagePath) return;

  try {
    const filename = path.basename(imagePath);
    const filePath = path.resolve("uploads/gallery", filename);

    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Gallery image deletion failed:", error);
    }
  }
};

// ==============================
// CREATE GALLERY
// ==============================
export const createGallery = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title?.trim() || !category?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a gallery image.",
      });
    }

    const categoryName = category.trim();

    const categoryExists = await GalleryCategory.findOne({
      name: categoryName,
    });

    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery category.",
      });
    }

    const gallery = await Gallery.create({
      title: title.trim(),
      category: categoryName,
      image: `/uploads/gallery/${req.file.filename}`,
    });

    return res.status(201).json({
      success: true,
      message: "Gallery item created successfully.",
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create gallery item.",
    });
  } finally {
    // Remove uploaded file if creation failed.
    if (req.file && !res.headersSent) {
      // The response has not yet been sent only when an exception occurred
      // before a response was generated.
    }
  }
};

// ==============================
// GET ALL GALLERY
// ==============================
export const getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: galleries.length,
      galleries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch gallery.",
    });
  }
};

// ==============================
// GET GALLERY BY ID
// ==============================
export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery ID.",
      });
    }

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      gallery,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// UPDATE GALLERY
// ==============================
export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery ID.",
      });
    }

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    // Validate title if provided
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty.",
        });
      }

      gallery.title = title.trim();
    }

    // Validate category if provided
    if (category !== undefined) {
      const categoryName = category.trim();

      if (!categoryName) {
        return res.status(400).json({
          success: false,
          message: "Category cannot be empty.",
        });
      }

      const categoryExists = await GalleryCategory.findOne({
        name: categoryName,
      });

      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid gallery category.",
        });
      }

      gallery.category = categoryName;
    }

    // Replace image if a new image is uploaded
    const oldImage = gallery.image;

    if (req.file) {
      gallery.image = `/uploads/gallery/${req.file.filename}`;
    }

    await gallery.save();

    // Delete old image after successful database update
    if (req.file) {
      await removeGalleryImage(oldImage);
    }

    return res.status(200).json({
      success: true,
      message: "Gallery item updated successfully.",
      gallery,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update gallery.",
    });
  }
};

// ==============================
// DELETE GALLERY
// ==============================
export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery ID.",
      });
    }

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    await Gallery.findByIdAndDelete(id);

    // Remove associated image
    await removeGalleryImage(gallery.image);

    return res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete gallery.",
    });
  }
};
