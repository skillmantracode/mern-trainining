
import Event from "../models/events.model.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.resolve(__dirname, "../../uploads");

// Helper: Delete event image
const deleteImage = async (filename) => {
  if (!filename) return;

  const safeFilename = path.basename(filename);

  await fs.unlink(path.join(uploadDir, safeFilename)).catch((error) => {
    if (error.code !== "ENOENT") {
      throw error;
    }
  });
};

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const { title, faculty, date, facebookUrl } = req.body;

    if (!title?.trim() || !faculty?.trim() || !date || !facebookUrl?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Event image is required.",
      });
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid event date.",
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(facebookUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid Facebook URL.",
      });
    }

    const allowedHosts = [
      "facebook.com",
      "www.facebook.com",
      "m.facebook.com",
      "fb.com",
      "www.fb.com",
    ];

    if (!allowedHosts.includes(parsedUrl.hostname.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a Facebook URL.",
      });
    }

    const event = await Event.create({
      title: title.trim(),
      faculty: faculty.trim(),
      date: parsedDate,
      facebookUrl: parsedUrl.toString(),
      image: req.file.filename,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    if (req.file?.filename) {
      await deleteImage(req.file.filename).catch(console.error);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL EVENTS
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE EVENT
export const updateEvent = async (req, res) => {
  try {
    const { title, faculty, date, facebookUrl } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      if (req.file?.filename) {
        await deleteImage(req.file.filename);
      }

      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const updates = {};

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title cannot be empty.",
        });
      }

      updates.title = title.trim();
    }

    if (faculty !== undefined) {
      if (!faculty.trim()) {
        return res.status(400).json({
          success: false,
          message: "Faculty cannot be empty.",
        });
      }

      updates.faculty = faculty.trim();
    }

    if (date !== undefined) {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid event date.",
        });
      }

      updates.date = parsedDate;
    }

    if (facebookUrl !== undefined) {
      let parsedUrl;

      try {
        parsedUrl = new URL(facebookUrl);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid Facebook URL.",
        });
      }

      const allowedHosts = [
        "facebook.com",
        "www.facebook.com",
        "m.facebook.com",
        "fb.com",
        "www.fb.com",
      ];

      if (!allowedHosts.includes(parsedUrl.hostname.toLowerCase())) {
        return res.status(400).json({
          success: false,
          message: "Please provide a Facebook URL.",
        });
      }

      updates.facebookUrl = parsedUrl.toString();
    }

    if (req.file) {
      updates.image = req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    // Remove old image after successful update
    if (req.file) {
      await deleteImage(event.image).catch(console.error);
    }

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      event: updatedEvent,
    });
  } catch (error) {
    if (req.file?.filename) {
      await deleteImage(req.file.filename).catch(console.error);
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EVENT
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    await deleteImage(event.image).catch(console.error);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET EVENT BY ID
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
