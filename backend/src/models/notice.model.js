import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 2000,
    },

    categoryNepali: {
      type: String,
      trim: true,
      default: "",
    },

    categoryEnglish: {
      type: String,
      trim: true,
      default: "SCHOOL NOTICE",
    },

    iconKey: {
      type: String,
      enum: ["userAdd", "graduation", "sparkling", "group"],
      default: "userAdd",
    },

    isHero: {
      type: Boolean,
      default: false,
    },

    isImportant: {
      type: Boolean,
      default: false,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    pdfName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Only one document can have isHero: true.
noticeSchema.index(
  { isHero: 1 },
  {
    unique: true,
    partialFilterExpression: { isHero: true },
  }
);

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;