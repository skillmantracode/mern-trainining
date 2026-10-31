// controllers/achievementController.js
import AchievementSection from "../models/achievement.model.js";
// @desc    Get achievement section data
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const sectionData = await AchievementSection.findOne();
    
    if (!sectionData) {
      return res.status(404).json({
        success: false,
        message: 'Achievement section data not found. Please initialize it using POST.',
      });
    }

    return res.status(200).json({
      success: true,
      data: sectionData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Create achievement section data (One-time setup)
// @route   POST /api/achievements
// @access  Admin
export const createAchievements = async (req, res) => {
  try {
    // Enforce one-time creation rule: Check if a document already exists
    const existingSection = await AchievementSection.findOne();
    if (existingSection) {
      return res.status(400).json({
        success: false,
        message: 'Achievement section already exists. Use PUT to update instead.',
      });
    }

    const newSection = new AchievementSection(req.body);
    const savedSection = await newSection.save();

    return res.status(201).json({
      success: true,
      message: 'Achievement section initialized successfully!',
      data: savedSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update achievement section data
// @route   PUT /api/achievements
// @access  Admin
export const updateAchievements = async (req, res) => {
  try {
    let section = await AchievementSection.findOne();

    if (!section) {
      return res.status(404).json({
        success: false,
        message: 'Achievement section not found. Please create it first using POST.',
      });
    }

    // Update fields if provided in request body
    section.badge = req.body.badge ?? section.badge;
    section.title = req.body.title ?? section.title;
    section.description = req.body.description ?? section.description;
    section.stats = req.body.stats ?? section.stats;

    const updatedSection = await section.save();

    return res.status(200).json({
      success: true,
      message: 'Achievement section updated successfully!',
      data: updatedSection,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};