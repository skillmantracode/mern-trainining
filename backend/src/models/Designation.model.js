import mongoose from "mongoose";

const DesignationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: true,
  },
  department:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"Department",
     required:true
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const DesignationModel = mongoose.model("Designation", DesignationSchema);
export default DesignationModel;
