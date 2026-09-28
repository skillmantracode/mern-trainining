import mongoose from "mongoose";

const chooseReasonSchema = new mongoose.Schema({
  selectIcon: {
    type: String,
  },
  featureTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const chooseReasonModel = mongoose.model("ChooseReason", chooseReasonSchema);
export default chooseReasonModel;
