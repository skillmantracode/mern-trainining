import welcomeModel from "../models/landingPage/WelcomeMessage.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Create the welcome message
export const createWelcomeMessage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No image file provided");
  }

  const image = `/uploads/${req.file.filename}`;
  const {
    principalName,
    role,
    topText,
    mainHeadline,
    welcomeParagraph,
    keyValues1,
    keyValues2,
    keyValues3,
    keyValues4,
  } = req.body;

  if (
    !principalName ||
    !role ||
    !topText ||
    !mainHeadline ||
    !welcomeParagraph
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const welcomeMessage = await welcomeModel.create({
    principalName,
    role,
    topText,
    mainHeadline,
    principalPic: image,
    welcomeParagraph,
    keyValues1,
    keyValues2,
    keyValues3,
    keyValues4,
  });

  if (!welcomeMessage) {
    throw new ApiError(500, "Failed to create welcome message");
  }

  res.status(201).json({
    success: true,
    message: "Welcome message created successfully",
    data: welcomeMessage,
  });
});


// Get the single welcome message
export const getWelcomeMessage = asyncHandler(async (req, res) => {
  const welcomeMessage = await welcomeModel.findOne();

  if (!welcomeMessage) {
    throw new ApiError(404, "No welcome message found");
  }

  res.status(200).json({
    success: true,
    message: "Welcome message fetched successfully",
    data: welcomeMessage,
  });
});

// Update the welcome message
export const updateWelcomeMessage = asyncHandler(async (req, res) => {
  const {
    principalName,
    role,
    topText,
    mainHeadline,
    welcomeParagraph,
    keyValues1,
    keyValues2,
    keyValues3,
    keyValues4,
  } = req.body;

  if (
    !principalName ||
    !role ||
    !topText ||
    !mainHeadline ||
    !welcomeParagraph
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // Find existing message first
  const existingMessage = await welcomeModel.findOne();
  if (!existingMessage) {
    throw new ApiError(404, "No welcome message exists to update");
  }

  // Construct absolute or cache-busted URL if a new file is uploaded
  let image = existingMessage.principalPic;
  if (req.file) {
    // Standard relative static path
    image = `/uploads/${req.file.filename}`;
  }

  const updatedWelcomeMessage = await welcomeModel.findByIdAndUpdate(
    existingMessage._id,
    {
      principalName,
      role,
      topText,
      mainHeadline,
      principalPic: image,
      welcomeParagraph,
      keyValues1,
      keyValues2,
      keyValues3,
      keyValues4,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Welcome message updated successfully",
    data: updatedWelcomeMessage,
  });
});