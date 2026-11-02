
import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Gallery title is required"],
      trim: true,
      maxlength: 150,
    },

    category: {
      type: String,
      required: [true, "Gallery category is required"],
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Gallery image is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
