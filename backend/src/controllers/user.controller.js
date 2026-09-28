import Students from "../models/student.model.js";
import userModel from "../models/user.model.js";
import Staff from "../models/staff.model.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

// create the user  function

export const createUser = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const payload = {
    username: req.body.username,
    password: req.body.password,
    profilePic: `/uploads/${req.file.filename}`,
    usertype: req.body.usertype,
    studentId: req.body.studentId,
    staffId: req.body.staffId,
  };

  if (!payload.username || !payload.password || !payload.usertype) {
    throw new ApiError(400, "Required field is missing");
  }

  // Checking existing user
  const existingUser = await userModel.findOne({
    username: payload.username,
  });
  if (existingUser) {
    throw new ApiError(400, "User is already exists");
  }

  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await userModel.create({
    username: payload.username,
    password: hashPassword,
    usertype: payload.usertype,
    profilePic: payload.profilePic,
    studentId: payload.usertype === "student" ? payload.studentId : null,
    staffId: payload.usertype === "staff" ? payload.staffId : null,
  });

  res.status(200).json({
    message: "The user is created successfully",
    success: true,
    user: {
      username: user.username,
      usertype: user.usertype,
      studentId: user.studentId,
      staffId: user.staffId,
    },
  });
});

//login the user
export const loginUser = asyncHandler(async (req, res) => {
  const payload = {
    username: req.body.username,
    password: req.body.password,
  };

  const isUser = await userModel.findOne({
    username: payload.username,
  });

  if (!isUser) {
    throw new ApiError(404, "User does not exist");
  }
  

  //compare the hash password
  const isMatch = await bcrypt.compare(payload.password, isUser.password);

  if (!isMatch) {
    throw new ApiError(400, "Invalid Crediantials");
  }

  const token = await jwt.sign(
    {
      userId: isUser._id,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  let userDetail;

  if (isUser.usertype == "student") {
    userDetail = await Students.findById(isUser.studentId);
  } else {
    userDetail = await Staff.findById(isUser.staffId);
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

   return res.status(200).json({
    message: "Login successfull",
    success: true,
    user: {
      username: isUser.username,
      usertype: isUser.usertype,
      studentId: isUser.studentId,
      staffId: isUser.staffId,
    },
    token: token,
    userDetail: userDetail,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  res.status(200).json({
    message:"The user is logout successfully",
    success:true
  })
});
