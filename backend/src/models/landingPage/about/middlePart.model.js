import mongoose from "mongoose";

const middlePartAboutSchema = new mongoose.Schema({
  campustPic: {
    type: String,
    required: true,
  },
  imageTagline: {
    type: String,
    required: true,
  },
  imageCardTitle: {
    type: String,
    required: true,
  },
  visionHeading: {
    type: String,
    required: true,
  },
  visionSubHeading: {
    type: String,
    required: true,
  },
});

const middleAboutModel = mongoose.model("MiddleAbout", middlePartAboutSchema);
export default middleAboutModel;
