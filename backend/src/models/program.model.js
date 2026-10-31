
import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      default: "Grade 11–12",
      trim: true,
    },
    iconKey: {
      type: String,
      enum: ["hotel", "computer", "flask", "book"],
      default: "hotel",
    },
    image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    duration: {
      type: String,
      default: "",
      trim: true,
    },
    eligibility: {
      type: String,
      default: "",
      trim: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    facilityTag: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Program = mongoose.model("Program", programSchema);

export default Program;
