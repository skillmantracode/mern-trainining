import mongoose from "mongoose";

const secondEventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: true,
  },
  departmentTags: {
    type: String,
    required: true,
  },
  cardDepartmentIcon: {
    type: String,
    required: true,
  },
});
const secondEventModel = mongoose.model("SecondEvent", secondEventSchema);
export default secondEventModel;
