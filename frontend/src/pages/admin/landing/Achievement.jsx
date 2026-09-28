import React, { useState } from "react";
import {
  RiTrophyLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiCalendarLine,
  RiMedalLine,
  RiUserStarLine,
  RiPriceTag3Line,
} from "react-icons/ri";

export default function AdminAchievement() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // General Header & Stats State
  const [headerData, setHeaderData] = useState({
    badgeText: "Excellence & Milestones",
    heading: "Our Notable Achievements",
    subheading:
      "Celebrating academic brilliance, athletic triumphs, and institutional milestones at Shree Siddhababa Secondary School.",
    stats: [
      { label: "NEB Rank / Awards", value: "Top 5" },
      { label: "Graduation Rate", value: "98.5%" },
      { label: "Total Trophies", value: "150+" },
    ],
  });

  // Dynamic Dynamic List of Achievement Items
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "National Tech & Robotics Championship 2025",
      category: "Technology",
      date: "2025-11-15",
      description:
        "Computer Engineering students secured 1st position in the National Secondary School Robotics Hackathon with an automated agri-tech prototype.",
      badge: "1st Place Gold",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Best Public Secondary School Award (Gandaki)",
      category: "Institutional",
      date: "2024-09-10",
      description:
        "Awarded by the Ministry of Education for outstanding academic performance, modern infrastructure, and student retention.",
      badge: "Excellence Award",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  // Form State for Adding / Editing Individual Items
  const [currentItem, setCurrentItem] = useState({
    title: "",
    category: "Academic",
    date: "",
    description: "",
    badge: "",
    imageFile: null,
    imagePreview: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Handle Header Text Changes
  const handleHeaderChange = (field, value) => {
    setHeaderData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...headerData.stats];
    updatedStats[index][field] = value;
    setHeaderData((prev) => ({ ...prev, stats: updatedStats }));
  };

  // Image Upload Handler for Item Form
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setCurrentItem((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setCurrentItem((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: "",
    }));
  };

  // Save Item to Achievements List
  const handleSaveAchievement = (e) => {
    e.preventDefault();
    if (!currentItem.title.trim()) return;

    if (editingId) {
      setAchievements((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentItem, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setAchievements((prev) => [
        ...prev,
        { ...currentItem, id: Date.now() },
      ]);
    }

    // Reset Item Form
    setCurrentItem({
      title: "",
      category: "Academic",
      date: "",
      description: "",
      badge: "",
      imageFile: null,
      imagePreview: "",
    });
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setEditingId(item.id);
  };

  const handleDeleteClick = (id) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentItem({
        title: "",
        category: "Academic",
        date: "",
        description: "",
        badge: "",
        imageFile: null,
        imagePreview: "",
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    // Insert API Call here to push headerData + achievements to your backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Achievements Section
          </h1>
          <p className="text-xs text-slate-500">
            Add, update, or remove school awards, milestones, and preview live changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Switcher */}
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
          {/* SECTION 1: HEADER & KEY STATS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              1. Section Header & Key Stats
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tag Badge Text
                </label>
                <input
                  type="text"
                  value={headerData.badgeText}
                  onChange={(e) =>
                    handleHeaderChange("badgeText", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Section Heading
                </label>
                <input
                  type="text"
                  value={headerData.heading}
                  onChange={(e) =>
                    handleHeaderChange("heading", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Subheading Description
              </label>
              <textarea
                rows={2}
                value={headerData.subheading}
                onChange={(e) =>
                  handleHeaderChange("subheading", e.target.value)
                }
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Stats Cards Editor */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Stats Badges (3 Counters)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {headerData.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2"
                  >
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Stat #{idx + 1}
                    </span>
                    <input
                      type="text"
                      placeholder="Label"
                      value={stat.label}
                      onChange={(e) =>
                        handleStatChange(idx, "label", e.target.value)
                      }
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 150+)"
                      value={stat.value}
                      onChange={(e) =>
                        handleStatChange(idx, "value", e.target.value)
                      }
                      className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded-md bg-white font-bold text-amber-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: ADD / EDIT ACHIEVEMENT ITEM */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                2. {editingId ? "Edit Achievement Item" : "Add New Achievement"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentItem({
                      title: "",
                      category: "Academic",
                      date: "",
                      description: "",
                      badge: "",
                      imageFile: null,
                      imagePreview: "",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveAchievement} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Achievement Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Science Olympiad Winner"
                    value={currentItem.title}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={currentItem.category}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Technology">Technology</option>
                    <option value="Sports">Sports</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Culture & Arts">Culture & Arts</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date / Year
                  </label>
                  <input
                    type="date"
                    value={currentItem.date}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Award Tag / Ribbon Text
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 1st Place Gold / Gold Medalist"
                      value={currentItem.badge}
                      onChange={(e) =>
                        setCurrentItem((prev) => ({
                          ...prev,
                          badge: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the milestone or competitive achievement..."
                      value={currentItem.description}
                      onChange={(e) =>
                        setCurrentItem((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Uploader Box for Item */}
                <div className="md:col-span-4 space-y-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Achievement Photo
                  </label>
                  <label
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        handleImageUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-3 text-center"
                  >
                    <RiUploadCloud2Line className="w-6 h-6 text-amber-500 mb-1" />
                    <span className="text-xs font-semibold text-slate-700">
                      Upload photo
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Drag & drop image file
                    </span>
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

                  {currentItem.imagePreview && (
                    <div className="relative h-20 rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                      <img
                        src={currentItem.imagePreview}
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
                  )}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Item" : "Add to Achievements List"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: MANAGED ACHIEVEMENTS TABLE / LIST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              3. Current Listed Achievements ({achievements.length})
            </h2>

            {achievements.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No achievements added yet. Use the form above to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col justify-between gap-3 hover:border-amber-400/50 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      {item.imagePreview ? (
                        <img
                          src={item.imagePreview}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-slate-900"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500">
                          <RiTrophyLine className="w-7 h-7" />
                        </div>
                      )}

                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-bold uppercase">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-900 text-amber-400 text-[10px] font-bold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.date || "No date set"}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                          className="px-2.5 py-1 bg-white border border-slate-200 hover:border-red-500 rounded-lg text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <RiDeleteBin6Line className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
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
        <div className="rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Landing Page Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section
            className="relative py-16 bg-slate-900 text-slate-100 overflow-hidden"
            id="achievements"
          >
            {/* Glowing Orbs Background */}
            <div className="absolute top-1/4 right-10 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              {/* Header Box */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                    <RiTrophyLine className="w-3.5 h-3.5" />
                    <span>{headerData.badgeText}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {headerData.heading}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {headerData.subheading}
                  </p>
                </div>

                {/* Header Stats */}
                <div className="flex flex-wrap items-center gap-3">
                  {headerData.stats.map(
                    (st, i) =>
                      st.value && (
                        <div
                          key={i}
                          className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-center min-w-[100px]"
                        >
                          <p className="text-base font-extrabold text-amber-400 font-mono">
                            {st.value}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {st.label}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Achievements Grid */}
              {achievements.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No achievements published yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-800/60 backdrop-blur-md rounded-3xl border border-slate-700/80 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all group"
                    >
                      <div className="space-y-4">
                        {/* Image Header with Badge Overlay */}
                        <div className="relative h-48 bg-slate-950 overflow-hidden">
                          {item.imagePreview ? (
                            <img
                              src={item.imagePreview}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-amber-500/30">
                              <RiTrophyLine className="w-16 h-16" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

                          {/* Category Tag */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-slate-200 text-[10px] font-bold uppercase tracking-wider">
                              {item.category}
                            </span>
                          </div>

                          {/* Award Badge Ribbon */}
                          {item.badge && (
                            <div className="absolute bottom-3 left-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg">
                                <RiMedalLine className="w-3.5 h-3.5" />
                                <span>{item.badge}</span>
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Card Body */}
                        <div className="p-5 space-y-2">
                          {item.date && (
                            <div className="flex items-center gap-1.5 text-[11px] text-amber-400 font-medium">
                              <RiCalendarLine className="w-3.5 h-3.5" />
                              <span>{item.date}</span>
                            </div>
                          )}
                          <h3 className="text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        <div className="w-full pt-3 border-t border-slate-700/60 text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                          <span>Shree Siddhababa Milestone</span>
                          <RiTrophyLine className="w-4 h-4 text-amber-500/60" />
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