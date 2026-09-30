import express from "express";
const router = express.Router();
import Staffs from "../models/staff.model.js";

router.post("/", async (req, res) => {
  try {
    const payload = {
      fullname: req.body.fullname,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      designation: req.body.designation,
      joinDate: req.body.joinDate,
      status: req.body.status,
    };

    //check the staff is exist or not
    const isStaff = await Staffs.findOne({ fullname: payload.fullname });
    if (isStaff) {
      res.status(401).json({
        message: "The user is already exist",
      });
    }
    const staff = await Staffs.create(payload);
    res.status(201).json({
      message: "The staff is created successfully",
      staff: staff,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "The internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    //find the staff to get
    const staff = await Staffs.find();
    res.status(201).json({
      message: "The staff is get successfully",
      staff: staff,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //find the staff by the id
    const isstaff = await Staffs.findById(id);

    if (!isstaff) {
      return res.status(400).json({
        success: false,
        message: "Can not find staff",
      });
    }
    const staff = await Staffs.findById(id);
    res.status(201).json({
      message: "The staff is get successfully",
      staff: staff,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

// delete the staff
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //find staff to delte
    const isstaff = await Staffs.findById(id);

    if (!isstaff) {
      return res.status(400).json({
        success: false,
        message: "Can not find staff",
      });
    }
    const staff = await Staffs.findByIdAndDelete(id);
    res.status(201).json({
      message: "The staff is delete successfully",

      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

//update teh staff
router.patch("/:id", async (req, res) => {
  try {
    const payload = {
      fullname: req.body.fullname,
      dob: req.body.dob,
      gender: req.body.gender,
      address: req.body.address,
      designation: req.body.designation,
      joinDate: req.body.joinDate,
      status: req.body.status,
    };
    const id = req.params.id;
    const isstaff = await Staffs.findById(id);

    if (!isstaff) {
      return res.status(400).json({
        success: false,
        message: "Can not find Staff",
      });
    }
    const staff = await Staffs.findByIdAndUpdate(id, payload);
    res.status(201).json({
      message: "The staff is update successfully",
      staff: staff,
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
});

export default router;
