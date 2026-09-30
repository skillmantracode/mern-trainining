import express from "express";
const router = express.Router();
import { createUser, loginUser,logoutUser } from "../controllers/user.controller.js";
import userModel from "../models/user.model.js";
import verifyToken from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";
import { asyncHandler } from "../utils/asyncHandler.js";
//post the user or create the user
router.post("/", upload.single("image"), createUser);

//fetch the user from the db
router.get("/", async (req, res) => {
  const user = await userModel.find();
  res.status(200).json({
    message: "The user is get successfully",
    success: true,
    user: user,
  });
});

router.get(
  "/me",
  verifyToken,
  asyncHandler(async (req, res) => {
    let user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userObj = user.toObject();

    if (user.usertype === "student" && user.studentId) {
      await user.populate("studentId");
      userObj.userDetail = user.studentId;
    } else if (user.usertype === "staff" && user.staffId) {
      // Populate staffId and nested designation
      await user.populate({
        path: "staffId",
        populate: {
          path: "designation",
          model: "Designation",
        },
      });
      userObj.userDetail = user.staffId;
    } else {
      userObj.userDetail = null;
    }

    // Clean up original ID properties
    delete userObj.studentId;
    delete userObj.staffId;

    res.json({
      user: userObj,
    });
  })
);

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      message: "The user id is provided",
    });
  }

  const user = await userModel.findById(id);

  res.status(200).json({
    message: "The user is get successfully",
    success: true,
    user: user,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json({
      message: "The user id is provided",
    });
  }

  const user = await userModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "The user is deleted successfully",
  });
});

// login user
router.post("/login", loginUser);

//logout user
router.post("/logout", verifyToken,logoutUser);



export default router;
