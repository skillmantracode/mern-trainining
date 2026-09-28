import React, { useState } from "react";
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
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiBook3Line,
} from "react-icons/ri";

export default function AdminProgramsSection() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Icon options mapping
  const iconOptions = [
    { key: "hotel", label: "Hotel Management (Hotel)" },
    { key: "computer", label: "Computer Engineering (Computer)" },
    { key: "flask", label: "General Science (Flask)" },
    { key: "book", label: "General Academic (Book)" },
  ];

  const renderBadgeIcon = (key) => {
    switch (key) {
      case "hotel":
        return <RiHotelLine className="w-6 h-6 text-white" />;
      case "computer":
        return <RiComputerLine className="w-6 h-6 text-white" />;
      case "flask":
        return <RiFlaskLine className="w-6 h-6 text-white" />;
      case "book":
        return <RiBook3Line className="w-6 h-6 text-white" />;
      default:
        return <RiHotelLine className="w-6 h-6 text-white" />;
    }
  };

  // Programs List State
  const [programs, setPrograms] = useState([
    {
      id: "hotel-management",
      title: "Hotel Management",
      grade: "Grade 11–12",
      iconKey: "hotel",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description:
        "Learn professional hospitality skills including food production, front office operations, housekeeping, and food & beverage service with state-of-the-art lab facilities.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.0 GPA",
      subjectsText:
        "Food Production, Front Office Operations, Housekeeping Management, Food & Beverage Service, Hospitality Accounting",
      subjects: [
        "Food Production",
        "Front Office Operations",
        "Housekeeping Management",
        "Food & Beverage Service",
        "Hospitality Accounting",
      ],
      facilityTag: "Practical Lab Facilities Available",
    },
    {
      id: "computer-engineering",
      title: "Computer Engineering",
      grade: "Grade 11–12",
      iconKey: "computer",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      description:
        "Comprehensive technical education covering software development, computer networking, web technologies, and database management for future tech leaders.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.4 GPA (Math & Science required)",
      subjectsText:
        "Programming C/C++, Web Development, Computer Networking, Database Systems, Digital Logic",
      subjects: [
        "Programming C/C++",
        "Web Development",
        "Computer Networking",
        "Database Systems",
        "Digital Logic",
      ],
      facilityTag: "High-Tech Computer Labs Available",
    },
    {
      id: "general-science",
      title: "General Science",
      grade: "Grade 11–12",
      iconKey: "flask",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      description:
        "Rigorous academic program focusing on core scientific principles, practical experiments, and preparation for medical, engineering, and research degrees.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.8 GPA",
      subjectsText: "Physics, Chemistry, Biology / Mathematics, English, Nepali",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology / Mathematics",
        "English",
        "Nepali",
      ],
      facilityTag: "Advanced Physics & Chem Labs",
    },
  ]);

  // Form State for Editing/Adding Program
  const [currentProgram, setCurrentProgram] = useState({
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
  });

  const [editingId, setEditingId] = useState(null);

  // Image Upload Handlers
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.URL ? URL.createObjectURL(file) : window.URL.createObjectURL(file);
      setCurrentProgram((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setCurrentProgram((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: "",
    }));
  };

  // Submit Handler for Program Form
  const handleSaveProgram = (e) => {
    e.preventDefault();
    if (!currentProgram.title.trim()) return;

    // Split comma separated subjects string into array
    const parsedSubjects = currentProgram.subjectsText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const programPayload = {
      ...currentProgram,
      subjects: parsedSubjects.length ? parsedSubjects : ["General Subjects"],
    };

    if (editingId) {
      setPrograms((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...programPayload, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setPrograms((prev) => [
        ...prev,
        { ...programPayload, id: `program-${Date.now()}` },
      ]);
    }

    // Reset Form
    setCurrentProgram({
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
    });
  };

  const handleEditClick = (program) => {
    setCurrentProgram(program);
    setEditingId(program.id);
  };

  const handleDeleteClick = (id) => {
    setPrograms((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentProgram({
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
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Academic Programs
          </h1>
          <p className="text-xs text-slate-500">
            Configure higher secondary courses, entry eligibility, subject tags, and media.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "editor"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RiEditBoxLine className="w-4 h-4" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "preview"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RiEyeLine className="w-4 h-4" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Global Save Button */}
          <button
            type="button"
            onClick={handleGlobalSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {isSaved ? (
              <RiCheckDoubleLine className="w-4 h-4" />
            ) : (
              <RiSave3Line className="w-4 h-4" />
            )}
            <span>{isSaved ? "Saved All!" : "Save All Changes"}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EDITOR FORM */}
      {activeTab === "editor" && (
        <div className="space-y-6">
          {/* FORM: ADD OR EDIT PROGRAM */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                1. {editingId ? "Edit Program Course" : "Add New Academic Program"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentProgram({
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
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Engineering"
                    value={currentProgram.title}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grade 11–12"
                    value={currentProgram.grade}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Badge Icon
                  </label>
                  <select
                    value={currentProgram.iconKey}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        iconKey: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Program Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide a overview of what students will learn..."
                  value={currentProgram.description}
                  onChange={(e) =>
                    setCurrentProgram((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Duration, Eligibility, Facility Tag */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Duration
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 years (Grade 11-12)"
                    value={currentProgram.duration}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Admission Eligibility
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SEE passed with minimum 2.4 GPA"
                    value={currentProgram.eligibility}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        eligibility: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lab / Facility Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. High-Tech Computer Labs Available"
                    value={currentProgram.facilityTag}
                    onChange={(e) =>
                      setCurrentProgram((prev) => ({
                        ...prev,
                        facilityTag: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Key Subjects */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Subjects (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="Programming C/C++, Web Development, Computer Networking, Database Systems"
                  value={currentProgram.subjectsText}
                  onChange={(e) =>
                    setCurrentProgram((prev) => ({
                      ...prev,
                      subjectsText: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Banner Upload Zone */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Program Card Banner Image
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8">
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-4 text-center"
                    >
                      <RiUploadCloud2Line className="w-7 h-7 text-amber-500 mb-1" />
                      <p className="text-xs font-semibold text-slate-700">
                        Click to upload or drag & drop banner image
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-4">
                    {currentProgram.imagePreview ? (
                      <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
                        <img
                          src={currentProgram.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs gap-1"
                        >
                          <RiDeleteBin6Line className="w-4 h-4 text-red-400" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <div className="h-32 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium">
                        No Banner Selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Program" : "Add Academic Program"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* LIST OF PROGRAM CARDS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              2. Active Academic Programs ({programs.length})
            </h2>

            {programs.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No programs added yet. Use the form above to add one.
              </div>
            ) : (
              <div className="space-y-4">
                {programs.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400/60 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                        {item.imagePreview ? (
                          <img
                            src={item.imagePreview}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-500">
                            No Img
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
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item.id)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-red-500 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiDeleteBin6Line className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE PREVIEW SECTION */}
      {activeTab === "preview" && (
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Academic Programs UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section className="py-16 bg-slate-100 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Academic Programs
                </h2>
                <p className="text-sm text-slate-500">
                  Explore our accredited higher secondary courses designed to prepare students for successful higher education and technical careers.
                </p>
              </div>

              {/* Programs List */}
              {programs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs bg-white rounded-3xl border border-dashed">
                  No academic programs added yet.
                </div>
              ) : (
                <div className="space-y-10">
                  {programs.map((program) => (
                    <div
                      key={program.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-xl"
                    >
                      {/* Left Image Banner Section */}
                      <div className="relative lg:w-5/12 min-h-[280px] lg:min-h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6">
                        {/* Background Image with Overlay */}
                        {program.imagePreview ? (
                          <img
                            src={program.imagePreview}
                            alt={program.title}
                            className="absolute inset-0 w-full h-full object-cover opacity-65 hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500 text-xs">
                            No Banner Image
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                        {/* Top Badge Icon */}
                        <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                          {renderBadgeIcon(program.iconKey)}
                        </div>

                        {/* Bottom Overlay Title & Grade */}
                        <div className="relative z-10 space-y-1.5 text-white">
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-700/60 text-[10px] font-medium tracking-wide">
                            {program.grade}
                          </span>
                          <h3 className="text-2xl font-bold tracking-tight text-white">
                            {program.title}
                          </h3>
                        </div>
                      </div>

                      {/* Right Content Section */}
                      <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-6">
                          {/* Program Description */}
                          <p className="text-sm text-slate-600 leading-relaxed font-normal">
                            {program.description}
                          </p>

                          {/* Duration & Eligibility Grid Boxes */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Duration Box */}
                            <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                                <RiTimeLine className="w-5 h-5" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Duration
                                </p>
                                <p className="text-xs font-semibold text-slate-800">
                                  {program.duration}
                                </p>
                              </div>
                            </div>

                            {/* Eligibility Box */}
                            <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-start gap-3">
                              <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                                <RiUserFollowLine className="w-5 h-5" />
                              </div>
                              <div className="space-y-0.5 min-w-0">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Eligibility
                                </p>
                                <p className="text-xs font-semibold text-slate-800 truncate">
                                  {program.eligibility}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Key Subjects Pills */}
                          <div className="space-y-2.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Key Subjects
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {program.subjects.map((subject, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs font-medium text-slate-700"
                                >
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Green Lab Tag */}
                          {program.facilityTag && (
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>{program.facilityTag}</span>
                            </div>
                          )}
                        </div>

                        {/* Call To Action Button */}
                        <div className="pt-2">
                          <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                            <span>View Full Details</span>
                            <RiArrowRightLine className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}