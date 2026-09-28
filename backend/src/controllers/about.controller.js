import lastAboutModel from "../models/landingPage/about/lastPart.model.js";
import middleAboutModel from "../models/landingPage/about/middlePart.model.js";
import upperAboutModel from "../models/landingPage/about/UpperPart.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// upper part

//create the upper part
export const createUpperAbout = asyncHandler(async (req, res) => {
  const {
    badgeText,
    schoolName,
    location,
    schoolCode,
    affiliation,
    estYear,
    overviewText,
  } = req.body;
  if (
    !badgeText ||
    !schoolCode ||
    !schoolName ||
    !location ||
    !affiliation ||
    !estYear ||
    !overviewText
  ) {
    throw new ApiError(400, "The required filed is  not available");
  }

  const upperAbout = await upperAboutModel.create({
    badgeText,
    schoolCode,
    schoolName,
    location,
    affiliation,
    estYear,
    overviewText,
  });
  if (!upperAbout) {
    throw new ApiError(400, "The upperAbout is not created");
  }

  res.status(200).json({
    message: "The upperAbout is created",
    success: true,
    upperAbout: upperAbout,
  });
});

//get upper part
export const getUpperAbout = asyncHandler(async (req, res) => {
  const upperAbout = await upperAboutModel.findOne();

  if (!upperAbout) {
    throw new ApiError(400, "The upperAbout is not get ");
  }

  res.status(200).json({
    message: "The upper part is get successfully",
    success: true,
    upperAbout: upperAbout,
  });
});

//update the upper part
export const updateUpperAbout = asyncHandler(async (req, res) => {
  const {
    badgeText,
    schoolName,
    location,
    schoolCode,
    affiliation,
    estYear,
    overviewText,
  } = req.body;
  if (
    !badgeText ||
    !schoolCode ||
    !schoolName ||
    !location ||
    !affiliation ||
    !estYear ||
    !overviewText
  ) {
    throw new ApiError(400, "The required filed is  not available");
  }

  const upperAbout = await upperAboutModel.findOneAndUpdate({
    badgeText,
    schoolCode,
    schoolName,
    location,
    affiliation,
    estYear,
    overviewText,
  });
  if (!upperAbout) {
    throw new ApiError(400, "The upperAbout is not created");
  }

  res.status(200).json({
    message: "The upperAbout is update successfully",
    success: true,
    upperAbout: upperAbout,
  });
});

//middle

//create middle part
export const createMiddleAbout = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "The image is not found");
  }
  const image = `uploads/req.file.filename`;
  const { imageTagLine, imageCardTitle, visionHeading, visionSubHeading } =
    req.body;
  if (!imageCardTitle || !imageTagLine || !visionHeading || !visionSubHeading) {
    throw new ApiError(400, "The required filed is  not available");
  }

  const middleAbout = await middleAboutModel.create({
    campusBanner: image,
    imageTagLine,
    imageCardTitle,
    visionHeading,
    visionSubHeading,
  });
  if (!middleAbout) {
    throw new ApiError(400, "The middleAbout is not created");
  }

  res.status(200).json({
    message: "The middleAbout is created",
    success: true,
    upperAbout: middleAbout,
  });
});

export const getMiddleAbout = asyncHandler(async (req, res) => {
  const middleAbout = await middleAboutModel.findOne();

  if (!middleAbout) {
    throw new ApiError(400, "The middleAbout is not get ");
  }

  res.status(200).json({
    message: "The middle part is get successfully",
    success: true,
    upperAbout: middleAbout,
  });
});

export const updateMiddleAbout = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "The image is not found");
  }
  const image = `uploads/req.file.filename`;
  const { imageTagLine, imageCardTitle, visionHeading, visionSubHeading } =
    req.body;
  if (!imageCardTitle || !imageTagLine || !visionHeading || !visionSubHeading) {
    throw new ApiError(400, "The required filed is  not available");
  }

  const middleAbout = await middleAboutModel.findOneAndUpdate({
    campusBanner: image,
    imageTagLine,
    imageCardTitle,
    visionHeading,
    visionSubHeading,
  });
  if (!middleAbout) {
    throw new ApiError(400, "The middleAbout is not updated");
  }

  res.status(200).json({
    message: "The middleAbout is update",
    success: true,
    upperAbout: middleAbout,
  });
});
