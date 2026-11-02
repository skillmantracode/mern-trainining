import HeroSlide from "../models/hero.model.js";

// Create Hero Slide
export const createHeroSlide = async (req, res) => {
  try {
    const {
      tag,
      nepaliTitle,
      title,
      subtitle,
      description,
      tags,
      isActive,
      order,
    } = req.body;

    // Check uploaded image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a background image",
      });
    }

    const slide = await HeroSlide.create({
      tag,
      nepaliTitle,
      title,
      subtitle,
      description,
      tags: JSON.parse(tags || "[]"),
      bgImage: req.file.filename,
      isActive: isActive === "true",
      order: Number(order) || 0,
    });

    res.status(201).json({
      success: true,
      message: "Hero slide created successfully",
      slide,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Hero Slides
export const getHeroSlides = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      slides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero slides",
    });
  }
};

// Get Single Hero Slide
export const getHeroSlideById = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found",
      });
    }

    res.status(200).json({
      success: true,
      slide,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid hero slide ID",
    });
  }
};

// Update Hero Slide
// Update hero slide
export const updateHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found",
      });
    }

    const {
      tag,
      nepaliTitle,
      title,
      subtitle,
      description,
      tags,
      isActive,
      order,
    } = req.body;

    // Update text fields only when provided
    if (tag !== undefined) slide.tag = tag;
    if (nepaliTitle !== undefined) slide.nepaliTitle = nepaliTitle;
    if (title !== undefined) slide.title = title;
    if (subtitle !== undefined) slide.subtitle = subtitle;
    if (description !== undefined) slide.description = description;

    if (tags !== undefined) {
      slide.tags = JSON.parse(tags);
    }

    if (isActive !== undefined) {
      slide.isActive = isActive === true || isActive === "true";
    }

    if (order !== undefined) {
      slide.order = Number(order);
    }

    // Replace image only if a new one was uploaded
    if (req.file) {
      slide.bgImage = req.file.filename;
    }

    await slide.save();

    res.status(200).json({
      success: true,
      message: "Hero slide updated successfully",
      slide,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Hero Slide
export const deleteHeroSlide = async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);

    if (!slide) {
      return res.status(404).json({
        success: false,
        message: "Hero slide not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero slide deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid hero slide ID",
    });
  }
};