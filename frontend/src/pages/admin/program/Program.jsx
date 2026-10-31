
import React, { useEffect, useState } from "react";

import {
  RiTimeLine,
  RiUserFollowLine,
  RiArrowRightLine,
  RiHotelLine,
  RiComputerLine,
  RiFlaskLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiBook3Line,
  RiCloseLine,
  RiLoader4Line,
  RiRefreshLine,
} from "react-icons/ri";

import toast from "react-hot-toast";

import {
  getPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from "../../../services/api";

// Your Express backend URL
const BACKEND_URL = "http://localhost:5000";

// Convert backend image path into a complete URL
const getProgramImage = (image) => {
  if (!image) return "";

  // Already a complete URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Relative backend path
  return `${BACKEND_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const INITIAL_FORM = {
  title: "",
  grade: "Grade 11–12",
  iconKey: "hotel",
  imageFile: null,
  imagePreview: "",
  description: "",
  duration: "2 years (Grade 11-12)",
  eligibility: "",
  subjectsText: "",
  facilityTag: "",
};

const iconOptions = [
  { key: "hotel", label: "Hotel Management" },
  { key: "computer", label: "Computer Engineering" },
  { key: "flask", label: "General Science" },
  { key: "book", label: "General Academic" },
];

const iconMap = {
  hotel: RiHotelLine,
  computer: RiComputerLine,
  flask: RiFlaskLine,
  book: RiBook3Line,
};

export default function AdminProgramsSection() {
  const [activeTab, setActiveTab] = useState("editor");

  const [programs, setPrograms] = useState([]);

  const [currentProgram, setCurrentProgram] = useState(INITIAL_FORM);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch programs from backend
  const fetchPrograms = async () => {
    try {
      setLoading(true);

      const response = await getPrograms();

      if (response.success) {
        setPrograms(response.programs || []);
      }
    } catch (error) {
      console.error("Fetch programs error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load programs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentProgram((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setCurrentProgram((prev) => {
      // Clean up previous local preview
      if (prev.imageFile && prev.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      return {
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      };
    });
  };

  // Reset form
  const resetForm = () => {
    setCurrentProgram((prev) => {
      if (prev.imageFile && prev.imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(prev.imagePreview);
      }

      return INITIAL_FORM;
    });

    setEditingId(null);
  };

  // Build FormData
  const buildFormData = () => {
    const formData = new FormData();

    const subjects = currentProgram.subjectsText
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    formData.append("title", currentProgram.title.trim());
    formData.append("grade", currentProgram.grade);
    formData.append("iconKey", currentProgram.iconKey);
    formData.append("description", currentProgram.description);
    formData.append("duration", currentProgram.duration);
    formData.append("eligibility", currentProgram.eligibility);
    formData.append("facilityTag", currentProgram.facilityTag);

    subjects.forEach((subject) => {
      formData.append("subjects", subject);
    });

    // Upload only when a new image is selected
    if (currentProgram.imageFile) {
      formData.append("image", currentProgram.imageFile);
    }

    return formData;
  };

  // Create or update program
  const handleSaveProgram = async (e) => {
    e.preventDefault();

    if (!currentProgram.title.trim()) {
      toast.error("Program title is required.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = buildFormData();

      if (editingId) {
        const response = await updateProgram(editingId, formData);

        if (response.success) {
          toast.success("Program updated successfully.");

          await fetchPrograms();
          resetForm();
        }
      } else {
        const response = await createProgram(formData);

        if (response.success) {
          toast.success("Program created successfully.");

          await fetchPrograms();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Save program error:", error);

      toast.error(
        error.response?.data?.message || "Failed to save program."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Edit program
  const handleEditClick = (program) => {
    setCurrentProgram({
      title: program.title || "",
      grade: program.grade || "Grade 11–12",
      iconKey: program.iconKey || "book",

      imageFile: null,

      // Convert backend image path into full URL
      imagePreview: getProgramImage(program.image),

      description: program.description || "",
      duration: program.duration || "",
      eligibility: program.eligibility || "",

      subjectsText: Array.isArray(program.subjects)
        ? program.subjects.join(", ")
        : "",

      facilityTag: program.facilityTag || "",
    });

    setEditingId(program._id);

    setActiveTab("editor");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Delete program
  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this academic program?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await deleteProgram(id);

      if (response.success) {
        toast.success("Program deleted successfully.");

        setPrograms((prev) =>
          prev.filter((program) => program._id !== id)
        );

        if (editingId === id) {
          resetForm();
        }
      }
    } catch (error) {
      console.error("Delete program error:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete program."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Render program card
  const renderProgramCard = (program, isPreview = false) => {
    const Icon = iconMap[program.iconKey] || RiBook3Line;

    // Get complete image URL
    const imageUrl = program.imagePreview
      ? program.imagePreview
      : getProgramImage(program.image);

    return (
      <div
        key={program._id || "preview"}
        className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-xl"
      >
        {/* Image */}
        <div className="relative lg:w-5/12 min-h-[280px] lg:min-h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={program.title}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="absolute inset-0 w-full h-full object-cover opacity-65"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
              <Icon className="w-20 h-20 text-white/30" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

          <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>

          <div className="relative z-10 space-y-1.5 text-white">
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-700/60 text-[10px] font-medium">
              {program.grade}
            </span>

            <h3 className="text-2xl font-bold">
              {program.title || "Program Title"}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">

          <div className="space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              {program.description}
            </p>

            {/* Duration and Eligibility */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0">
                  <RiTimeLine className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Duration
                  </p>

                  <p className="text-xs font-semibold text-slate-800">
                    {program.duration}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0">
                  <RiUserFollowLine className="w-5 h-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    Eligibility
                  </p>

                  <p className="text-xs font-semibold text-slate-800">
                    {program.eligibility}
                  </p>
                </div>
              </div>

            </div>

            {/* Subjects */}
            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Key Subjects
              </p>

              <div className="flex flex-wrap gap-2">
                {(
                  Array.isArray(program.subjects)
                    ? program.subjects
                    : program.subjectsText?.split(",") || []
                ).map((subject, index) => (
                  <span
                    key={`${subject}-${index}`}
                    className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 text-xs font-medium text-slate-700"
                  >
                    {subject.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Facility */}
            {program.facilityTag && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                {program.facilityTag}
              </div>
            )}
          </div>

          {isPreview && (
            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold"
              >
                View Full Details
                <RiArrowRightLine className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Academic Programs
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Create, update and manage academic programs displayed on your website.
          </p>
        </div>

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={fetchPrograms}
            disabled={loading}
            className="p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50"
            title="Refresh programs"
          >
            <RiRefreshLine
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>

          <div className="bg-slate-100 p-1 rounded-xl flex gap-1 border border-slate-200 text-xs font-semibold">

            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeTab === "editor"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <RiEditBoxLine className="w-4 h-4" />
              Editor
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                activeTab === "preview"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500"
              }`}
            >
              <RiEyeLine className="w-4 h-4" />
              Preview
            </button>

          </div>
        </div>
      </div>

      {/* EDITOR */}
      {activeTab === "editor" && (
        <div className="space-y-6">

          {/* Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-sm">

            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                  {editingId ? "Edit Academic Program" : "Add New Academic Program"}
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  Fill in the details below.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <RiCloseLine className="w-4 h-4" />
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">

              {/* Title, Grade and Icon */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Program Title *
                  </label>

                  <input
                    type="text"
                    name="title"
                    required
                    value={currentProgram.title}
                    onChange={handleChange}
                    placeholder="e.g. Computer Engineering"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Grade
                  </label>

                  <input
                    type="text"
                    name="grade"
                    value={currentProgram.grade}
                    onChange={handleChange}
                    placeholder="Grade 11–12"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Badge Icon
                  </label>

                  <select
                    name="iconKey"
                    value={currentProgram.iconKey}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg bg-white outline-none focus:border-amber-500"
                  >
                    {iconOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Program Description
                </label>

                <textarea
                  name="description"
                  rows={3}
                  value={currentProgram.description}
                  onChange={handleChange}
                  placeholder="Describe what students will learn..."
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500 resize-y"
                />
              </div>

              {/* Duration, Eligibility, Facility */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Course Duration
                  </label>

                  <input
                    name="duration"
                    value={currentProgram.duration}
                    onChange={handleChange}
                    placeholder="2 years"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Admission Eligibility
                  </label>

                  <input
                    name="eligibility"
                    value={currentProgram.eligibility}
                    onChange={handleChange}
                    placeholder="SEE passed with minimum 2.4 GPA"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Lab / Facility Badge
                  </label>

                  <input
                    name="facilityTag"
                    value={currentProgram.facilityTag}
                    onChange={handleChange}
                    placeholder="Computer Lab Available"
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                  />
                </div>

              </div>

              {/* Subjects */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Key Subjects (Comma Separated)
                </label>

                <input
                  name="subjectsText"
                  value={currentProgram.subjectsText}
                  onChange={handleChange}
                  placeholder="Physics, Chemistry, Mathematics, English"
                  className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-lg outline-none focus:border-amber-500"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Program Banner Image
                </label>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                  <div className="md:col-span-8">
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        handleImageUpload(e.dataTransfer.files?.[0]);
                      }}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-4 text-center"
                    >
                      <RiUploadCloud2Line className="w-7 h-7 text-amber-500 mb-2" />

                      <p className="text-xs font-semibold text-slate-700">
                        Click or drag and drop an image
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          handleImageUpload(e.target.files?.[0]);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-4">

                    {currentProgram.imagePreview ? (
                      <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-900">

                        <img
                          src={
                            currentProgram.imageFile
                              ? currentProgram.imagePreview
                              : getProgramImage(currentProgram.imagePreview)
                          }
                          alt="Program banner preview"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                          className="w-full h-full object-cover"
                        />

                        {currentProgram.imageFile && (
                          <span className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-600 text-white text-[10px] rounded-md">
                            New Image Selected
                          </span>
                        )}

                      </div>
                    ) : (
                      <div className="h-32 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                        No Banner Selected
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-3 flex flex-wrap justify-end gap-3">

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={submitting}
                    className="px-5 py-2.5 border border-slate-300 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all"
                >
                  {submitting ? (
                    <RiLoader4Line className="w-4 h-4 animate-spin" />
                  ) : (
                    <RiAddLine className="w-4 h-4 text-amber-400" />
                  )}

                  {submitting
                    ? "Saving..."
                    : editingId
                      ? "Update Program"
                      : "Add Academic Program"}
                </button>

              </div>
            </form>
          </div>

          {/* Programs List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-sm">

            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Active Academic Programs
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  {programs.length} programs available
                </p>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <RiLoader4Line className="w-8 h-8 animate-spin mx-auto text-amber-500" />

                <p className="text-xs text-slate-400 mt-3">
                  Loading programs...
                </p>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-xl">
                <RiBook3Line className="w-8 h-8 mx-auto text-slate-300" />

                <p className="text-sm font-semibold text-slate-500 mt-3">
                  No programs added yet.
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Use the form above to create your first program.
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {programs.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400/60 transition-all"
                  >

                    <div className="flex items-center gap-4 min-w-0">

                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">

                        {item.image ? (
                          <img
                            src={getProgramImage(item.image)}
                            alt={item.title}
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                            No Image
                          </div>
                        )}

                      </div>

                      <div className="space-y-1 min-w-0">

                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            {item.grade}
                          </span>

                          <span className="text-[10px] font-medium text-slate-400">
                            • {item.duration}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {item.title}
                        </h4>

                        <p className="text-xs text-slate-500 line-clamp-1">
                          {item.description}
                        </p>

                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 border-slate-200 w-full md:w-auto justify-end">

                      <button
                        type="button"
                        onClick={() => handleEditClick(item)}
                        className="px-3 py-2 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item._id)}
                        disabled={deletingId === item._id}
                        className="px-3 py-2 bg-white border border-slate-200 hover:border-red-500 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
                      >
                        {deletingId === item._id ? (
                          <RiLoader4Line className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <RiDeleteBin6Line className="w-3.5 h-3.5" />
                        )}

                        Delete
                      </button>

                    </div>
                  </div>
                ))}

              </div>
            )}
          </div>
        </div>
      )}

      {/* LIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-xl">

          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Academic Programs</span>

            <span className="text-amber-400">Live Preview</span>
          </div>

          <section className="py-12 sm:py-16 bg-slate-100 space-y-10">

            <div className="text-center max-w-2xl mx-auto px-4 space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Academic Programs
              </h2>

              <p className="text-sm text-slate-500">
                Explore our higher secondary academic programs.
              </p>
            </div>

            <div className="max-w-6xl mx-auto px-4 space-y-10">

              {programs.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl text-sm text-slate-400">
                  No programs available.
                </div>
              ) : (
                programs.map((program) =>
                  renderProgramCard(program, true)
                )
              )}

            </div>
          </section>
        </div>
      )}
    </div>
  );
}
