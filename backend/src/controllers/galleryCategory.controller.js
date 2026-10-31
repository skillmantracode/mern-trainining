
import GalleryCategory from "../models/galleryCategory.model.js";
import Gallery from "../models/gallery.model.js";

// ==============================
// CREATE CATEGORY
// ==============================
export const createGalleryCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Category name is required.",
      });
    }

    const categoryName = name.trim();

    // Case-insensitive duplicate check
    const existingCategory = await GalleryCategory.findOne({
      name: {
        $regex: `^${categoryName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
        $options: "i",
      },
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    const category = await GalleryCategory.create({
      name: categoryName,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Category already exists.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create category.",
    });
  }
};

// ==============================
// GET ALL CATEGORIES
// ==============================
export const getGalleryCategories = async (req, res) => {
  try {
    const categories = await GalleryCategory.find()
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories.",
    });
  }
};

// ==============================
// DELETE CATEGORY
// ==============================
export const deleteGalleryCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const category = await GalleryCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // Prevent deleting categories currently in use
    const isUsed = await Gallery.exists({
      category: category.name,
    });

    if (isUsed) {
      return res.status(409).json({
        success: false,
        message:
          "This category is being used. Reassign or delete its gallery items first.",
      });
    }

    await GalleryCategory.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete category.",
    });
  }
};
