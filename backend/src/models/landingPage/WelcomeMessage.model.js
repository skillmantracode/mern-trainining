import mongoose from "mongoose";

const welcomeSchema = new mongoose.Schema({
  principalName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  topText: {
    type: String,
    required: true,
  },
  mainHeadline: {
    type: String,
    required: true,
  },
  principalPic: {
    type: String,
    required: true,
  },
  welcomeParagraph: {
    type: String,
    required: true,
  },
  keyValues1: {
    type: String,
    required: true,
  },
  keyValues2: {
    type: String,
    required: true,
  },
  keyValues3: {
    type: String,
    required: true,
  },
  keyValues4: {
    type: String,
    required: true,
  },
});

const welcomeModel = mongoose.model("Welcome", welcomeSchema);

export default welcomeModel;
