import Notice from "../models/notice.model.js";
import fs from "fs/promises";
import path from "path";

const uploadDirectory = path.join(
  process.cwd(),
  "uploads",
  "notices"
);

// Helper: remove uploaded PDF safely.
const removePdf = async (filename) => {
  if (!filename) return;

  const filePath = path.join(uploadDirectory, filename);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("PDF deletion error:", error);
    }
  }
};

// Helper: parse multipart boolean values.
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  return value === "true";
};

// 1. CREATE NOTICE
export const createNotice = async (req, res) => {
  let newFile = req.file?.filename;

  try {
    const {
      title,
      description,
      categoryNepali,
      categoryEnglish,
      iconKey,
      isHero,
      isImportant,
      date,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Notice title is required",
      });
    }

    const featured = parseBoolean(isHero);

    // Remove featured status from previous notice.
    if (featured) {
      await Notice.updateMany(
        { isHero: true },
        { $set: { isHero: false } }
      );
    }

    const notice = await Notice.create({
      title,
      description,
      categoryNepali,
      categoryEnglish,
      iconKey,
      isHero: featured,
      isImportant: parseBoolean(isImportant),
      date: date || new Date(),
      pdfName: req.file?.filename || "",
    });

    newFile = null;

    return res.status(201).json({
      success: true,
      message: "Notice created successfully",
      notice,
    });
  } catch (error) {
    if (newFile) await removePdf(newFile);

    console.error("Create notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create notice",
    });
  }
};

// 2. GET ALL NOTICES
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .sort({ isHero: -1, date: -1, createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      message: "Notices fetched successfully",
      notices,
    });
  } catch (error) {
    console.error("Get notices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

// 3. UPDATE NOTICE
export const updateNotice = async (req, res) => {
  let newFile = req.file?.filename;

  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    const {
      title,
      description,
      categoryNepali,
      categoryEnglish,
      iconKey,
      isHero,
      isImportant,
      date,
    } = req.body;

    // Update only fields sent by frontend.
    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Notice title cannot be empty",
        });
      }

      notice.title = title;
    }

    if (description !== undefined)
      notice.description = description;

    if (categoryNepali !== undefined)
      notice.categoryNepali = categoryNepali;

    if (categoryEnglish !== undefined)
      notice.categoryEnglish = categoryEnglish;

    if (iconKey !== undefined)
      notice.iconKey = iconKey;

    if (isImportant !== undefined)
      notice.isImportant = parseBoolean(isImportant);

    if (date !== undefined) {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid publication date",
        });
      }

      notice.date = parsedDate;
    }

    if (isHero !== undefined) {
      const featured = parseBoolean(isHero);

      if (featured) {
        await Notice.updateMany(
          {
            _id: { $ne: id },
            isHero: true,
          },
          { $set: { isHero: false } }
        );
      }

      notice.isHero = featured;
    }

    // Replace PDF only if a new PDF is uploaded.
    const oldPdf = notice.pdfName;

    if (req.file) {
      notice.pdfName = req.file.filename;
    }

    await notice.save();

    // Delete old PDF after successful database update.
    if (req.file && oldPdf) {
      await removePdf(oldPdf);
    }

    newFile = null;

    return res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      notice,
    });
  } catch (error) {
    if (newFile) await removePdf(newFile);

    console.error("Update notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notice",
    });
  }
};

// 4. DELETE NOTICE
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    const pdfName = notice.pdfName;

    await notice.deleteOne();

    // Delete associated PDF after successful database deletion.
    if (pdfName) {
      await removePdf(pdfName);
    }

    return res.status(200).json({
      success: true,
      message: "Notice deleted successfully",
    });
  } catch (error) {
    console.error("Delete notice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notice",
    });
  }
};

// GET notice by ID
export const getNoticeById = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findById(id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notice fetched successfully",
      notice,
    });
  } catch (error) {
    console.error("Get notice by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notice",
    });
  }
};