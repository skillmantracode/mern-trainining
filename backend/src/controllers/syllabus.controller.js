
import Syllabus from "../models/landingPage/syllabus.model.js";
import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";

// Helper: Delete uploaded PDF from server
const removePdfFile = async (pdfUrl) => {
  if (!pdfUrl) return;

  try {
    const filename = path.basename(pdfUrl);
    const filePath = path.resolve("uploads", filename);

    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("PDF deletion error:", error);
    }
  }
};

// CREATE SYLLABUS
export const createSyllabus = async (req, res) => {
  try {
    const { title, grade, program, subjects } = req.body;

    if (!title?.trim() || !grade || !program) {
      return res.status(400).json({
        success: false,
        message: "Title, grade and program are required.",
      });
    }

    const syllabus = await Syllabus.create({
      title,
      grade,
      program,
      subjects: subjects || "",
      pdfName: req.file?.originalname || "",
      pdfUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });

    return res.status(201).json({
      success: true,
      message: "Syllabus created successfully.",
      syllabus,
    });
  } catch (error) {
    if (req.file) {
      await removePdfFile(`/uploads/${req.file.filename}`);
    }

    console.error("Create syllabus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create syllabus.",
    });
  }
};

// GET ALL SYLLABUS
export const getSyllabus = async (req, res) => {
  try {
    const { grade, program } = req.query;

    const filter = {};

    if (grade && grade !== "All Grades") {
      filter.grade = grade;
    }

    if (program && program !== "All Programs") {
      filter.program = program;
    }

    const syllabus = await Syllabus.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Syllabus fetched successfully.",
      total: syllabus.length,
      syllabus,
    });
  } catch (error) {
    console.error("Get syllabus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch syllabus.",
    });
  }
};

// GET SYLLABUS BY ID
export const getSyllabusById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid syllabus ID.",
      });
    }

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Syllabus fetched successfully.",
      syllabus,
    });
  } catch (error) {
    console.error("Get syllabus by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch syllabus.",
    });
  }
};

// UPDATE SYLLABUS
export const updateSyllabus = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, grade, program, subjects, removePdf } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid syllabus ID.",
      });
    }

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found.",
      });
    }

    // Update only fields provided by frontend
    if (title !== undefined) syllabus.title = title;
    if (grade !== undefined) syllabus.grade = grade;
    if (program !== undefined) syllabus.program = program;
    if (subjects !== undefined) syllabus.subjects = subjects;

    const oldPdfUrl = syllabus.pdfUrl;

    // Remove existing PDF if requested
    if (removePdf === "true") {
      syllabus.pdfName = "";
      syllabus.pdfUrl = "";
    }

    // Replace existing PDF if a new one is uploaded
    if (req.file) {
      syllabus.pdfName = req.file.originalname;
      syllabus.pdfUrl = `/uploads/${req.file.filename}`;
    }

    await syllabus.save();

    // Delete old file only after successful database update
    if (
      oldPdfUrl &&
      oldPdfUrl !== syllabus.pdfUrl
    ) {
      await removePdfFile(oldPdfUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Syllabus updated successfully.",
      syllabus,
    });
  } catch (error) {
    if (req.file) {
      await removePdfFile(`/uploads/${req.file.filename}`);
    }

    console.error("Update syllabus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update syllabus.",
    });
  }
};

// DELETE SYLLABUS
export const deleteSyllabus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid syllabus ID.",
      });
    }

    const syllabus = await Syllabus.findById(id);

    if (!syllabus) {
      return res.status(404).json({
        success: false,
        message: "Syllabus not found.",
      });
    }

    await Syllabus.findByIdAndDelete(id);

    // Remove associated PDF
    if (syllabus.pdfUrl) {
      await removePdfFile(syllabus.pdfUrl);
    }

    return res.status(200).json({
      success: true,
      message: "Syllabus deleted successfully.",
    });
  } catch (error) {
    console.error("Delete syllabus error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete syllabus.",
    });
  }
};
