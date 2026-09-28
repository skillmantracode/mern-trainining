import DesignationModel from "../models/Designation.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";




// Create Designation
export const createDesignation = asyncHandler(async (req, res) => {
  const { title, code, department, description, status } = req.body;

  if (!title || !code || !description || !department) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const normalizedCode = code.trim().toUpperCase();

  const isCodeExist = await DesignationModel.findOne({ code: normalizedCode });
  if (isCodeExist) {
    throw new ApiError(400, "A designation with this code already exists.");
  }

  const designation = await DesignationModel.create({
    title,
    code: normalizedCode,
    department,
    description,
    status: status ?? true,
  });

  return res.status(201).json({
    success: true,
    message: "Designation created successfully",
    data: designation,
  });
});

// Get All Designations
export const getDesignation = asyncHandler(async (req, res) => {
  // Fix: populate "title code" so department.title is available on the frontend
  const designations = await DesignationModel.find().populate(
    "department",
    "title code"
  );

  return res.status(200).json({
    success: true,
    message: "Designations fetched successfully",
    data: designations,
  });
});

// Delete Designation
export const deleteDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const designation = await DesignationModel.findByIdAndDelete(id);

  if (!designation) {
    throw new ApiError(404, "Designation not found");
  }

  return res.status(200).json({
    success: true,
    message: "Designation deleted successfully",
    data: designation,
  });
});

// Update Designation
export const updateDesignation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, code, department, description, status } = req.body;

  if (!title || !code || !description || !department) {
    throw new ApiError(400, "All required fields must be provided.");
  }

  const normalizedCode = code.trim().toUpperCase();

  // Exclude current designation ID from uniqueness check
  const isCodeExist = await DesignationModel.findOne({
    code: normalizedCode,
    _id: { $ne: id },
  });

  if (isCodeExist) {
    throw new ApiError(400, "A designation with this code already exists.");
  }

  const designation = await DesignationModel.findByIdAndUpdate(
    id,
    {
      title,
      code: normalizedCode,
      department,
      description,
      status,
    },
    { new: true, runValidators: true }
  );

  if (!designation) {
    throw new ApiError(404, "Designation not found");
  }

  return res.status(200).json({
    success: true,
    message: "Designation updated successfully",
    data: designation,
  });
});