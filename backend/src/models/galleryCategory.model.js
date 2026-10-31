
import mongoose from "mongoose";

const galleryCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const GalleryCategory = mongoose.model(
  "GalleryCategory",
  galleryCategorySchema
);

export default GalleryCategory;
