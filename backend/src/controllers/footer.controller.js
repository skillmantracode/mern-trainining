
import Footer from "../models/footer.model.js";

// CREATE FOOTER
export const createFooter = async (req, res) => {
  try {
    const existingFooter = await Footer.findOne();

    if (existingFooter) {
      return res.status(409).json({
        success: false,
        message: "Footer already exists. Please update it.",
      });
    }

    const footer = await Footer.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Footer created successfully.",
      footer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FOOTER
export const getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      footer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE FOOTER
export const updateFooter = async (req, res) => {
  try {
    const updateData = {};

    const allowedFields = [
      "schoolName",
      "description",
      "contact",
      "socialLinks",
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields provided for update.",
      });
    }

    const footer = await Footer.findOneAndUpdate(
      {},
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Footer updated successfully.",
      footer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
