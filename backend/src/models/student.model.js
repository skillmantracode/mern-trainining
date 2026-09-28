import mongoose from "mongoose";

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhone: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
const Students = mongoose.model("Students", studentsSchema);
export default Students;
