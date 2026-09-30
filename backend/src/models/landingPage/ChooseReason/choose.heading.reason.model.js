import mongoose from "mongoose";

const chooseHeadingSchema = new mongoose.Schema({
  tagBadgeText: {
    type: String,
    required: true,
  },
  headingMainText: {
    type: String,
    required: true,
  },
  headingHighlight: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const chooseHeadingModel = mongoose.model("ChooseHeading", chooseHeadingSchema);
export default chooseHeadingModel;
