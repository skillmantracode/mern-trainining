import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    fullname: {
      required: true,
      type: String,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    designation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Designation",
      required: true,
    },
    joinDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Staffs = mongoose.model("Staffs", staffSchema);
export default Staffs;
