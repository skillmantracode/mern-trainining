import firstEventModel from "../models/landingPage/event/firstPart.model.js";
import secondEventModel from "../models/landingPage/event/secondPart.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//first part
export const createFirstEvent = asyncHandler(async (req, res) => {
  const { departmentTags } = req.body;
  if (!departmentTags) {
    throw new ApiError(400, "The required filed is not available");
  }

  const tags = await firstEventModel.create({ departmentTags });
  if (!tags) {
    throw new ApiError(400, "The tags are not created");
  }

  res.status(200).json({
    message: "The tags are created successfully",
    success: true,
    tags: tags,
  });
});

export const deleteFirstEvent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteTags = await firstEventModel.findByIdAndDelete(id);
  if (!deleteTags) {
    throw new ApiError(400, "The server is not able to delete");
  }
  res.status(200).json({
    message: "The tags are delete successfully",
    success: true,
  });
});

export const getFirstEvent = asyncHandler(async (req, res) => {
  const getTags = await firstEventModel.find();
  if (!getTags) {
    throw new ApiError(400, "The server is not able to find the tags");
  }
  res.status(200).json({
    message: "The tags are get successfully",
    success: true,
    tags: getTags,
  });
});

//second part
export const createSecondEvent = asyncHandler(async (req, res) => {
  const { eventTitle, departmentTags, cardDepartmentIcon } = req.body;
  if (!departmentTags || !eventTitle || !cardDepartmentIcon) {
    throw new ApiError(400, "The required filed is not available");
  }

  const tags = await secondEventModel.create({
    eventTitle,
    departmentTags,
    cardDepartmentIcon,
  });
  if (!tags) {
    throw new ApiError(400, "The events are not created");
  }

  res.status(200).json({
    message: "The event are created successfully",
    success: true,
    events: tags,
  });
});

export const deleteSecondEvent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleteTags = await secondEventModel.findByIdAndDelete(id);
  if (!deleteTags) {
    throw new ApiError(400, "The server is not able to delete");
  }
  res.status(200).json({
    message: "The events are delete successfully",
    success: true,
  });
});

export const getSecondEvent = asyncHandler(async (req, res) => {
  const getTags = await secondEventModel.find();
  if (!getTags) {
    throw new ApiError(400, "The server is not able to find the events");
  }
  res.status(200).json({
    message: "The events are get successfully",
    success: true,
    events: getTags,
  });
});

export const updateSecondEvent = asyncHandler(async (req, res) => {
  const { eventTitle, departmentTags, cardDepartmentIcon } = req.body;
  const id=req.params.id
  if (!departmentTags || !eventTitle || !cardDepartmentIcon) {
    throw new ApiError(400, "The required filed is not available");
  }

  const tags = await secondEventModel.findByIdAndUpdate(id,{
    eventTitle,
    departmentTags,
    cardDepartmentIcon,
  });
  if (!tags) {
    throw new ApiError(400, "The events are not updated");
  }

  res.status(200).json({
    message: "The event are updated successfully",
    success: true,
    events: tags,
  });
});
