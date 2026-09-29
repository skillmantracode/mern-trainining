import React, { useState, useEffect } from "react";
import {
  RiBankLine,
  RiMapPinLine,
  RiAwardLine,
  RiShieldCheckLine,
  RiGroupLine,
  RiBookOpenLine,
  RiArrowRightLine,
  RiSave3Line,
  RiEyeLine,
  RiEditBoxLine,
  RiCheckDoubleLine,
  RiUploadCloud2Line,
  RiDeleteBin6Line,
} from "react-icons/ri";

// Import your API service methods
import {
  getUpperAbout,
  updateUpperAbout,
  getMiddleAbout,
  updateMiddleAbout,
  getLowAboutPart,
  updateLowAboutPart,
} from "../../../features/Landing/api"; // Adjust path as needed

export default function About() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form State structured to match backend models exactly
  const [aboutData, setAboutData] = useState({
    // Upper Part
    badgeText: "",
    schoolName: "",
    location: "",
    schoolCode: "",
    affiliation: "",
    estYear: "",
    overviewText: "",

    // Middle Part
    imageFile: null,
    imagePreview: "",
    imageTagLine: "",
    imageCardTitle: "",
    visionHeading: "",
    visionSubHeading: "",

    // Lower Part
    card: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  });

  // Fetch initial data for Upper, Middle, and Lower sections on mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const [upperRes, middleRes, lowerRes] = await Promise.allSettled([
          getUpperAbout(),
          getMiddleAbout(),
          getLowAboutPart(),
        ]);

        let updatedState = { ...aboutData };

        if (upperRes.status === "fulfilled" && upperRes.value?.upperAbout) {
          const upper = upperRes.value.upperAbout;
          updatedState = {
            ...updatedState,
            badgeText: upper.badgeText || "",
            schoolName: upper.schoolName || "",
            location: upper.location || "",
            schoolCode: upper.schoolCode || "",
            affiliation: upper.affiliation || "",
            estYear: upper.estYear || "",
            overviewText: upper.overviewText || "",
          };
        }

        if (middleRes.status === "fulfilled" && middleRes.value?.upperAbout) {
          // Note: Backend response uses 'upperAbout' key for middle part in controller
          const middle = middleRes.value.upperAbout;
          const backendBaseUrl = "http://localhost:5000/"; // Adjust API backend host if needed
          updatedState = {
            ...updatedState,
            imageTagLine: middle.imageTagLine || "",
            imageCardTitle: middle.imageCardTitle || "",
            visionHeading: middle.visionHeading || "",
            visionSubHeading: middle.visionSubHeading || "",
            imagePreview: middle.campusBanner ? `${backendBaseUrl}${middle.campusBanner}` : "",
          };
        }

        if (lowerRes.status === "fulfilled" && lowerRes.value?.card) {
          const lower = lowerRes.value.card;
          updatedState = {
            ...updatedState,
            card: Array.isArray(lower.card) ? lower.card : updatedState.card,
          };
        }

        setAboutData(updatedState);
      } catch (err) {
        setErrorMessage("Failed to load section data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const handleInputChange = (field, value) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHighlightChange = (index, field, value) => {
    const updatedCards = [...aboutData.card];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setAboutData((prev) => ({ ...prev, card: updatedCards }));
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setAboutData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setAboutData((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage("");

    try {
      // 1. Update Upper Part
      const upperPayload = {
        badgeText: aboutData.badgeText,
        schoolName: aboutData.schoolName,
        location: aboutData.location,
        schoolCode: aboutData.schoolCode,
        affiliation: aboutData.affiliation,
        estYear: aboutData.estYear,
        overviewText: aboutData.overviewText,
      };
      await updateUpperAbout(upperPayload);

      // 2. Update Middle Part (via FormData for File support)
      const middleFormData = new FormData();
      if (aboutData.imageFile) {
        middleFormData.append("campusBanner", aboutData.imageFile);
      }
      middleFormData.append("imageTagLine", aboutData.imageTagLine);
      middleFormData.append("imageCardTitle", aboutData.imageCardTitle);
      middleFormData.append("visionHeading", aboutData.visionHeading);
      middleFormData.append("visionSubHeading", aboutData.visionSubHeading);

      await updateMiddleAbout(middleFormData);

      // 3. Update Lower Part
      await updateLowAboutPart({ card: aboutData.card });

      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (err) {
      console.error("Save Error:", err);
      setErrorMessage(err?.response?.data?.message || "Failed to update changes. Please verify all inputs.");
    } finally {
      setSaving(false);
    }
  };

  const highlightIcons = [
    <RiAwardLine className="w-5 h-5 text-amber-400" key="1" />,
    <RiShieldCheckLine className="w-5 h-5 text-amber-400" key="2" />,
    <RiGroupLine className="w-5 h-5 text-amber-400" key="3" />,
    <RiBookOpenLine className="w-5 h-5 text-amber-400" key="4" />,
  ];

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-semibold text-sm">
        Loading about section settings...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Controls & Tab Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Manage About Section</h1>
          <p className="text-xs text-slate-500">
            Edit landing page information or view live changes in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
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

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isSaved ? <RiCheckDoubleLine className="w-4 h-4" /> : <RiSave3Line className="w-4 h-4" />}
            <span>{saving ? "Saving..." : isSaved ? "Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium">
          {errorMessage}
        </div>
      )}

      {/* VIEW 1: EDITOR FORM */}
      {activeTab === "editor" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header & Meta Badges Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600">
              1. Basic Information & Badges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Badge Text
                </label>
                <input
                  type="text"
                  value={aboutData.badgeText}
                  onChange={(e) => handleInputChange("badgeText", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  value={aboutData.schoolName}
                  onChange={(e) => handleInputChange("schoolName", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={aboutData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  School Code / ID
                </label>
                <input
                  type="text"
                  value={aboutData.schoolCode}
                  onChange={(e) => handleInputChange("schoolCode", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={aboutData.affiliation}
                  onChange={(e) => handleInputChange("affiliation", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Est. Year
                </label>
                <input
                  type="text"
                  value={aboutData.estYear}
                  onChange={(e) => handleInputChange("estYear", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Overview Text
              </label>
              <textarea
                rows={3}
                value={aboutData.overviewText}
                onChange={(e) => handleInputChange("overviewText", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Media & Vision Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600">
              2. Campus Banner & Vision
            </h2>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Campus Banner Image
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
                    className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-4 text-center"
                  >
                    <RiUploadCloud2Line className="w-8 h-8 text-amber-500 mb-1" />
                    <p className="text-xs font-semibold text-slate-700">
                      Click to upload or drag & drop image
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
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
                  {aboutData.imagePreview ? (
                    <div className="relative h-36 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
                      <img
                        src={aboutData.imagePreview}
                        alt="Campus Banner Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="p-2 bg-red-600 text-white rounded-lg text-xs flex items-center gap-1 hover:bg-red-500 transition-colors"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium">
                      No Image Uploaded
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Tagline Badge
                </label>
                <input
                  type="text"
                  value={aboutData.imageTagLine}
                  onChange={(e) => handleInputChange("imageTagLine", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Card Title
                </label>
                <input
                  type="text"
                  value={aboutData.imageCardTitle}
                  onChange={(e) => handleInputChange("imageCardTitle", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vision Heading
                </label>
                <input
                  type="text"
                  value={aboutData.visionHeading}
                  onChange={(e) => handleInputChange("visionHeading", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vision Subheading / Paragraph
              </label>
              <textarea
                rows={2}
                value={aboutData.visionSubHeading}
                onChange={(e) => handleInputChange("visionSubHeading", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Highlights Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-600">
              3. Core Highlights (4 Cards)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.card.map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Card #{idx + 1}
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => handleHighlightChange(idx, "title", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <input
                      type="text"
                      value={item.description || ""}
                      onChange={(e) => handleHighlightChange(idx, "description", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}

      {/* VIEW 2: LIVE PREVIEW SECTION */}
      {activeTab === "preview" && (
        <div className="rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Landing Page UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          <section className="relative py-16 bg-slate-900 text-slate-100 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                      <RiBankLine className="w-3.5 h-3.5" />
                      <span>{aboutData.badgeText || "About Our Institution"}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {aboutData.schoolName || "School Name"}
                    </h1>
                    <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                      <RiMapPinLine className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{aboutData.location || "Location"}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        School Code / ID
                      </p>
                      <p className="text-xs font-bold text-amber-400 font-mono">
                        {aboutData.schoolCode || "N/A"}
                      </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Affiliation
                      </p>
                      <p className="text-xs font-bold text-slate-200">
                        {aboutData.affiliation || "N/A"}
                      </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Est. Year
                      </p>
                      <p className="text-xs font-bold text-amber-300">
                        {aboutData.estYear || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {aboutData.overviewText || "No overview provided."}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-700/80 bg-slate-950 group">
                  {aboutData.imagePreview ? (
                    <img
                      src={aboutData.imagePreview}
                      alt={aboutData.schoolName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
                      No Campus Image Uploaded
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider">
                      {aboutData.imageTagLine || "Campus Life"}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {aboutData.imageCardTitle || "Building Future Leaders"}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {aboutData.visionHeading || "Our Vision"}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {aboutData.visionSubHeading || "No vision statement available."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {aboutData.card.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                          {highlightIcons[idx] || <RiAwardLine className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-slate-100">
                            {item.title || `Highlight ${idx + 1}`}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            {item.description || "Description pending..."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-lg shadow-amber-500/20">
                      <span>Explore Academic Programs</span>
                      <RiArrowRightLine className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}