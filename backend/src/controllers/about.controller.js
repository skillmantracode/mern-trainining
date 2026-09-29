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
  const { badgeText, schoolName, location, schoolCode, affiliation, estYear, overviewText } = req.body;
  
  if (!badgeText || !schoolCode || !schoolName || !location || !affiliation || !estYear || !overviewText) {
    throw new ApiError(400, "Required fields are missing");
  }

  const upperAbout = await upperAboutModel.findOneAndUpdate(
    {}, // Matches the single existing document
    { badgeText, schoolCode, schoolName, location, affiliation, estYear, overviewText },
    { new: true }
  );

  if (!upperAbout) {
    throw new ApiError(404, "UpperAbout document not found");
  }

  res.status(200).json({
    message: "UpperAbout updated successfully",
    success: true,
    upperAbout,
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
  const {
    imageTagLine,
    imageCardTitle,
    visionHeading,
    visionSubHeading,
  } = req.body;

  if (
    !imageCardTitle ||
    !imageTagLine ||
    !visionHeading ||
    !visionSubHeading
  ) {
    throw new ApiError(400, "Required fields are missing");
  }

  const updateData = {
    imageTagLine,
    imageCardTitle,
    visionHeading,
    visionSubHeading,
  };

  // Only replace image if a new image was uploaded
  if (req.file) {
    updateData.campusBanner = `uploads/${req.file.filename}`;
  }

  const middleAbout = await middleAboutModel.findOneAndUpdate(
    {},
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!middleAbout) {
    throw new ApiError(404, "MiddleAbout document not found");
  }

  res.status(200).json({
    message: "MiddleAbout updated successfully",
    success: true,
    middleAbout,
  });
});
//lower part

export const createLowAboutPart = asyncHandler(async (req, res) => {
  const { card } = req.body;
  if (!card) {
    throw new ApiError(400, "The required card is not availabe");
  }

  const createCard = await lastAboutModel.create({
    card,
  });

  res.status(200).json({
    message: "The card is create successfully",
    success: true,
  });
});
export const getLowAboutPart = asyncHandler(async (req, res) => {
  const card = await lastAboutModel.findOne();
  if (!card) {
    throw new ApiError(404, "Card data not found");
  }

  res.status(200).json({
    message: "Card retrieved successfully",
    success: true,
    card,
  });
});

export const updateLowAboutPart = asyncHandler(async (req, res) => {
  const { card } = req.body;
  if (!card) {
    throw new ApiError(400, "The required card data is missing");
  }

  const updatedCard = await lastAboutModel.findOneAndUpdate(
    {},
    { card },
    { new: true }
  );

  if (!updatedCard) {
    throw new ApiError(404, "LastAbout document not found");
  }

  res.status(200).json({
    message: "Lower part updated successfully",
    success: true,
    card: updatedCard,
  });
});
