import express from "express";

import Students from "../models/student.model.js";

const router = express.Router();

//create the student
router.post("/", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      grade: req.body.grade,
      section: req.body.section,
      faculty: req.body.faculty,
      academicYear: req.body.academicYear,
      fatherName: req.body.fatherName,
      motherName: req.body.motherName,
      guardianName: req.body.guardianName,
      guardianPhone: req.body.guardianPhone,
      phone: req.body.phone,
      address: req.body.address,
    };
    //create student
    const student = await Students.create(payload);
    res.json({
      message: "The students posts successfully",
      student: student,
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    //find the student to get
    const students = await Students.find();
    res.status(200).json({
      message: "The students gets successfully",
      students: students,
    });
  } catch (err) {
    console.log(err.message);
  }
});

//get student by Id

router.get("/:id", async (req, res) => {
  try {
    const studentID = req.params.id;

    //find student by id
    const student = await Students.findById(studentID);
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Can not find Student",
      });
    }
    res.status(200).json({
      success: true,
      message: "Student fetch successfully",
      student: student,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});
router.patch("/:id", async (req, res) => {
  const id = req.params.id;

  const payload = {
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    grade: req.body.grade,
    section: req.body.section,
    faculty: req.body.faculty,
    academicYear: req.body.academicYear,
    fatherName: req.body.fatherName,
    motherName: req.body.motherName,
    guardianName: req.body.guardianName,
    guardianPhone: req.body.guardianPhone,
    phone: req.body.phone,
    address: req.body.address,
  };
  //update student
  const updatedStudent = await Students.findByIdAndUpdate(id, payload);
  res.status(201).json({
    message: "The student is updated successfully",
    success: true,
    student: updatedStudent,
  });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    //delete student
    const student = await Students.findByIdAndDelete(id);
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Can not delete Student",
      });
    }
    res.status(200).json({
      success: true,
      message: "The student is delete successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Can not delete Student",
      error_message: error.message,
    });
  }
});

export default router;
