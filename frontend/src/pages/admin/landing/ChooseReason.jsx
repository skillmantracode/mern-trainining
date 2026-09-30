import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getChooseReason,
  getReasonHeading,
  postChooseReason,
  deleteChooseReason  
} from "../../../services/api";

import {
  RiMedalLine,
  RiTeamLine,
  RiComputerLine,
  RiBook3Line,
  RiShieldCheckLine,
  RiGlobalLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import toast from "react-hot-toast";

export default function AdminWhyChooseUs() {
const navigate = useNavigate();
  const [headerData, setHeaderData] = useState({});
  const [header, setHeader] = useState(null);
  const [features, setFeatures] = useState([]);
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Available Icons list for mapping inside editor selection
  const iconOptions = [
    { key: "medal", label: "Medal / Award", icon: <RiMedalLine /> },
    { key: "team", label: "Team / Faculty", icon: <RiTeamLine /> },
    { key: "computer", label: "Computer / Tech", icon: <RiComputerLine /> },
    { key: "book", label: "Book / Education", icon: <RiBook3Line /> },
    { key: "shield", label: "Shield / Security", icon: <RiShieldCheckLine /> },
    { key: "global", label: "Global / Career", icon: <RiGlobalLine /> },
  ];

  // Map key string to actual JSX Icon component
  const getIconComponent = (key, className = "w-6 h-6") => {
    switch (key) {
      case "medal":
        return <RiMedalLine className={className} />;
      case "team":
        return <RiTeamLine className={className} />;
      case "computer":
        return <RiComputerLine className={className} />;
      case "book":
        return <RiBook3Line className={className} />;
      case "shield":
        return <RiShieldCheckLine className={className} />;
      case "global":
        return <RiGlobalLine className={className} />;
      default:
        return <RiMedalLine className={className} />;
    }
  };

  // Dynamic Features Card List

  const loadHeader = async () => {
    const data = await getReasonHeading();

    const heading = data.reasonHeading?.[0];

    setHeader(heading);

    setHeaderData({
      badgeText: heading?.tagBadgeText || "",
      headingMain: heading?.headingMainText || "",
      headingHighlight: heading?.headingHighlight || "",
      subheading: heading?.description || "",
    });
  };

  const loadFeature = async () => {
    const data = await getChooseReason();
    setFeatures(data.reason);
  };
  useEffect(() => {
    loadFeature();
    loadHeader();
  }, []);

  // General Section Header State

  // Form State for Adding/Editing an Individual Feature Card
  const [currentFeature, setCurrentFeature] = useState({
    iconKey: "medal",
    title: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Header Handlers
  const handleHeaderChange = (field, value) => {
    setHeaderData((prev) => ({ ...prev, [field]: value }));
  };

  // Feature Card List Handlers
  const handleSaveFeature = async (e) => {
    e.preventDefault();
    if (!currentFeature.title.trim()) return;

    const payload = {
      selectIcon: currentFeature.iconKey,
      featureTitle: currentFeature.title,
      description: currentFeature.description,
    };

    try {
      const data = await postChooseReason(payload);
      if (data) {
        toast.success("The features is added successfully");
      }
    } catch (error) {
      console.log(error);
    }

    if (editingId) {
      setFeatures((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentFeature, id: editingId } : item,
        ),
      );
      setEditingId(null);
    } else {
      setFeatures((prev) => [...prev, { ...currentFeature, id: Date.now() }]);
    }

    // Reset Item Form
    setCurrentFeature({
      iconKey: "medal",
      title: "",
      description: "",
    });
  };

  const handleEditClick = (feature) => {
    setCurrentFeature(feature);
    setEditingId(feature.id);
  };

  const handleDeleteClick = async (id) => {
     try {
      const deleteitem=await deleteChooseReason(id)
      if(deleteitem){
        navigate("/admin/choose-reason")
        toast.success("The features is delete successfully")
      }
     } catch (error) {
      console.log(error);
      
     }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    // API call to persist headerData and features list to backend

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Controls & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage "Why Choose Us" Section
          </h1>
          <p className="text-xs text-slate-500">
            Modify core institutional features, titles, descriptions, and
            preview live changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Editor/Preview Switcher */}
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
          {/* SECTION 1: HEADER DATA */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              1. Section Header & Subtitle
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Heading Main Text
                </label>
                <input
                  type="text"
                  value={headerData.headingMain}
                  onChange={(e) =>
                    handleHeaderChange("headingMain", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Heading Highlight (Gold Color)
                </label>
                <input
                  type="text"
                  value={headerData.headingHighlight}
                  onChange={(e) =>
                    handleHeaderChange("headingHighlight", e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 font-bold text-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section Subheading / Description
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
          </div>

          {/* SECTION 2: ADD / EDIT FEATURE CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                2. {editingId ? "Edit Feature Card" : "Add New Feature Card"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentFeature({
                      iconKey: "medal",
                      title: "",
                      description: "",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveFeature} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Icon
                  </label>
                  <select
                    value={currentFeature.iconKey}
                    onChange={(e) =>
                      setCurrentFeature((prev) => ({
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

                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Academic Excellence"
                    value={currentFeature.title}
                    onChange={(e) =>
                      setCurrentFeature((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Feature Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short explanation highlighting this feature..."
                  value={currentFeature.description}
                  onChange={(e) =>
                    setCurrentFeature((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Feature" : "Add Feature Card"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: FEATURE CARDS MANAGEMENT LIST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              3. Current Feature Cards ({features.length})
            </h2>

            {features.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No feature cards available. Add one using the form above.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/60 flex flex-col justify-between gap-3 hover:border-amber-400/50 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                          {getIconComponent(item.iconKey, "w-5 h-5")}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          0{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/80">
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
                        onClick={() => handleDeleteClick(item._id)}
                        className="px-2.5 py-1 bg-white border border-slate-200 hover:border-red-500 rounded-lg text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors"
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
            <span>PREVIEW MODE: Landing Page Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* LANDING PAGE UI RENDER MATCHING ORIGINAL SECTION DESIGN */}
          <section className="relative py-20 bg-slate-50 text-slate-800 overflow-hidden">
            {/* Soft Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/40 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Section Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-800 text-xs font-semibold tracking-wide uppercase">
                  <span>{headerData.badgeText}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {headerData.headingMain}{" "}
                  <span className="text-amber-600">
                    {headerData.headingHighlight}
                  </span>
                </h2>

                {/* Gold Dot & Dividers */}
                <div className="flex items-center justify-center gap-2 py-1">
                  <span className="w-12 h-[1px] bg-slate-200" />
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="w-12 h-[1px] bg-slate-200" />
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  {headerData.subheading}
                </p>
              </div>

              {/* Feature Cards Grid */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-amber-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon Box */}
                      <div className="w-14 h-14 rounded-2xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors duration-300">
                        {getIconComponent(
                          item.iconKey,
                          "w-6 h-6 text-slate-700 group-hover:text-amber-600 transition-colors",
                        )}
                      </div>

                      {/* Content */}
                      <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-200">
                        {item.title}
                      </h3>

                      {/* Gold Dot Accent under title */}
                      <div className="flex items-center gap-2 my-3">
                        <span className="w-6 h-[1px] bg-slate-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="w-6 h-[1px] bg-slate-200" />
                      </div>

                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Decorative Footer */}
                    <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
                      <span>0{idx + 1}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Learn more &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
