
import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    grade: {
      type: String,
      required: true,
      enum: Array.from(
        { length: 12 },
        (_, index) => `Class ${index + 1}`
      ),
    },

    program: {
      type: String,
      required: true,
      enum: [
        "General",
        "Hotel Management",
        "Computer Engineering",
      ],
    },

    subjects: {
      type: String,
      trim: true,
      default: "",
    },

    pdfName: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Syllabus = mongoose.model("Syllabus", syllabusSchema);

export default Syllabus;
