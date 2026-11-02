
import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";

import Program from "../models/program.model.js";

// Parse subjects
const parseSubjects = (subjects) => {
  if (!subjects) return [];

  if (Array.isArray(subjects)) {
    return subjects.map((item) => item.trim()).filter(Boolean);
  }

  try {
    const parsed = JSON.parse(subjects);

    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // Use comma-separated format
  }

  return subjects
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

// Remove uploaded image
const removeImage = async (image) => {
  if (!image || !image.startsWith("/uploads/programs/")) return;

  try {
    const filename = path.basename(image);
    const imagePath = path.resolve("uploads/programs", filename);

    await fs.unlink(imagePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Image deletion error:", error.message);
    }
  }
};

// CREATE PROGRAM
export const createProgram = async (req, res) => {
  try {
    const {
      title,
      grade,
      iconKey,
      description,
      duration,
      eligibility,
      facilityTag,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Program title is required.",
      });
    }

    const program = await Program.create({
      title,
      grade,
      iconKey,
      description,
      duration,
      eligibility,
      facilityTag,
      subjects: parseSubjects(req.body.subjects),
      image: req.file
        ? `/uploads/programs/${req.file.filename}`
        : "",
    });

    return res.status(201).json({
      success: true,
      message: "Program created successfully.",
      program,
    });
  } catch (error) {
    if (req.file) {
      await removeImage(`/uploads/programs/${req.file.filename}`);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create program.",
    });
  }
};

// GET ALL PROGRAMS
export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      programs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch programs.",
    });
  }
};

// GET PROGRAM BY ID
export const getProgramById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid program ID.",
      });
    }

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    return res.status(200).json({
      success: true,
      program,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch program.",
    });
  }
};

// UPDATE PROGRAM
export const updateProgram = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid program ID.",
      });
    }

    const program = await Program.findById(id);

    if (!program) {
      if (req.file) {
        await removeImage(`/uploads/programs/${req.file.filename}`);
      }

      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    const {
      title,
      grade,
      iconKey,
      description,
      duration,
      eligibility,
      facilityTag,
      subjects,
    } = req.body;

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Program title cannot be empty.",
        });
      }

      program.title = title;
    }

    if (grade !== undefined) program.grade = grade;
    if (iconKey !== undefined) program.iconKey = iconKey;
    if (description !== undefined) program.description = description;
    if (duration !== undefined) program.duration = duration;
    if (eligibility !== undefined) program.eligibility = eligibility;
    if (facilityTag !== undefined) program.facilityTag = facilityTag;

    if (subjects !== undefined) {
      program.subjects = parseSubjects(subjects);
    }

    const oldImage = program.image;

    if (req.file) {
      program.image = `/uploads/programs/${req.file.filename}`;
    }

    await program.save();

    if (req.file && oldImage) {
      await removeImage(oldImage);
    }

    return res.status(200).json({
      success: true,
      message: "Program updated successfully.",
      program,
    });
  } catch (error) {
    if (req.file) {
      await removeImage(`/uploads/programs/${req.file.filename}`);
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update program.",
    });
  }
};

// DELETE PROGRAM
export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid program ID.",
      });
    }

    const program = await Program.findById(id);

    if (!program) {
      return res.status(404).json({
        success: false,
        message: "Program not found.",
      });
    }

    await Program.findByIdAndDelete(id);

    if (program.image) {
      await removeImage(program.image);
    }

    return res.status(200).json({
      success: true,
      message: "Program deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete program.",
    });
  }
};
