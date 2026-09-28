import chooseHeadingModel from "../models/landingPage/ChooseReason/choose.heading.reason.model.js";
import chooseReasonModel from "../models/landingPage/ChooseReason/choose.reason.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//This api is for the post the choose Reason Heading
const postReasonHeading = asyncHandler(async (req, res) => {
  const { tagBadgeText, headingMainText, headingHighlight, description } =
    req.body;
  if (!tagBadgeText || !headingHighlight || !headingMainText || !description) {
    throw new ApiError(400, "The all fields are required ");
  }

  const headingReason = await chooseHeadingModel.create({
    tagBadgeText,
    headingHighlight,
    headingMainText,
    description,
  });

  if (!headingReason) {
    throw new ApiError(400, "The Reason is not created");
  }

  res.status(200).json({
    headingReason: headingReason,
    succeses: true,
    message: "The Choose Reason heading is created",
  });
});

//This api is for the update the choose Reason Heading
const updateReasonHeading = asyncHandler(async (req, res) => {
  const { tagBadgeText, headingMainText, headingHighlight, description } =
    req.body;
  if (!tagBadgeText || !headingHighlight || !headingMainText || !description) {
    throw new ApiError(400, "The all fields are required ");
  }

  const headingReason = await chooseHeadingModel.findOneAndUpdate(
    {},
    {
      tagBadgeText,
      headingHighlight,
      headingMainText,
      description,
    },
  );

  if (!headingReason) {
    throw new ApiError(400, "The Reason is not able to update");
  }
  res.status(200).json({
    headingReason: headingReason,
    succeses: true,
    message: "The Choose Reason heading is updated successfully",
  });
});

const getReasonHeading = asyncHandler(async (req, res) => {
  const resonheading = await chooseHeadingModel.find();
  if (!res) {
    throw new ApiError(400, "Not able to get the reason heading");
  }

  res.status(200).json({
    message: "The choose reason heading is get Successfully",
    reasonHeading: resonheading,
  });
});

//This api is created for post the choose reason
const postChooseReason = asyncHandler(async (req, res) => {
  const { selectIcon, featureTitle, description } = req.body;

  if (!featureTitle || !description) {
    throw new ApiError(400, "The feature and description is required");
  }

  const reason = await chooseReasonModel.create({
    selectIcon,
    featureTitle,
    description,
  });

  if (!reason) {
    throw new ApiError(400, "This Reason is not created");
  }

  res.status(200).json({
    message: "The choose reason is created successfully",
    reason: reason,
    success: true,
  });
});

const getChooseReason = asyncHandler(async (req, res) => {
  const reason = await chooseReasonModel.find();
  if (!reason) {
    throw new ApiError(400, "It is not able to get the choose reason ");
  }

  res.status(200).json({
    message: "The choose reason are get successfully",
    reason: reason,
    success:true
  });
});

const getChooseReasonById = asyncHandler(async (req, res) => {
  const id=req.params.id
  const reason = await chooseReasonModel.findById(id);
  if (!reason) {
    throw new ApiError(400, "It is not able to get the choose reason ");
  }

  res.status(200).json({
    message: "The choose reason are get successfully",
    reason: reason,
    success:true
  });
});

//This api is created for delete the choose reason
const deleteChooseReason = asyncHandler(async (req, res) => {
  const reasonId = req.params.reasonId;

  const deleteReason = await chooseReasonModel.findByIdAndDelete(reasonId);

  if (!deleteReason) {
    throw new ApiError(400, "The reason in not deleted");
  }
  res.status(200).json({
    message: "The reason is deleted successfully ",
    succeses: true,
  });
});

//this api is created for deleted the update the reason
const updateChooseReason = asyncHandler(async (req, res) => {
  const { selectIcon, featureTitle, description } = req.body;
  const reasonId = req.params.reasonId;
  if (!featureTitle || !description) {
    throw new ApiError(400, "The feature and description is required");
  }
  const reason = await chooseReasonModel.findByIdAndUpdate(reasonId, {
    selectIcon,
    featureTitle,
    description,
  });
  if (!reason) {
    throw new ApiError(400, "The reason is not updated");
  }

  res.status(200).json({
    message: "The reason is updated successfully",
    success: true,
    reason: reason,
  });
});

export {
  postReasonHeading,
  updateReasonHeading,
  postChooseReason,
  deleteChooseReason,
  updateChooseReason,
  getReasonHeading,
  getChooseReason,
  getChooseReasonById
};
