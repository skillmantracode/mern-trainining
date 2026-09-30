import syllabusModel from "../models/landingPage/syllabus.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createSyllbus = asyncHandler(async (req, res) => {
  const { syllabusTitle, gradeLevel, program, topic } = req.body;

  if (!syllabusTitle || !gradeLevel || !program || !topic) {
    throw new ApiError(400, "The required filed is not given");
  }

  const syllabus = await syllabusModel.create({
    syllabusTitle,
    gradeLevel,
    program,
    topic,
  });
  if (!syllabus) {
    throw new ApiError(400, "The server is not able to create the syllabus");
  }
  res.status(200).json({
    message: "The syllabus is created successfully",
    success: true,
    syllabus: syllabus,
  });
});

export const getSyllbus = asyncHandler(async (req, res) => {
  const syllabus = await syllabusModel.find();
  if (!syllabus) {
    throw new ApiError(400, "The server is not able to get the syllabus");
  }
  res.status(200).json({
    message: "The syllabus is get successfully",
    success: true,
    syllabus: syllabus,
  });
});

export const deleteSyllbus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const syllabus = await syllabusModel.findByIdAndDelete(id);
  if (!syllabus) {
    throw new ApiError(400, "The server is not able to delete the syllabus");
  }
  res.status(200).json({
    message: "The syllabus is delete successfully",
    success: true,
  });
});

export const updateSyllbus = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { syllabusTitle, gradeLevel, program, topic } = req.body;

  if (!syllabusTitle || !gradeLevel || !program || !topic) {
    throw new ApiError(400, "The required filed is not given");
  }

  const syllabus = await syllabusModel.findByIdAndUpdate(id, {
    syllabusTitle,
    gradeLevel,
    program,
    topic,
  });
  if (!syllabus) {
    throw new ApiError(400, "The server is not able to update the syllabus");
  }
  res.status(200).json({
    message: "The syllabus is update successfully",
    success: true,
    syllabus:syllabus
  });
});
