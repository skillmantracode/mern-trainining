
import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "footer",
      unique: true,
      immutable: true,
    },

    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    contact: {
      address: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },

    socialLinks: {
      facebook: {
        type: String,
        default: "",
        trim: true,
      },
      instagram: {
        type: String,
        default: "",
        trim: true,
      },
      youtube: {
        type: String,
        default: "",
        trim: true,
      },
      linkedin: {
        type: String,
        default: "",
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const Footer = mongoose.model("Footer", footerSchema);

export default Footer;
