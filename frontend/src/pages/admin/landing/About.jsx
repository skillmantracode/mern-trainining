import React, { useState } from "react";
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

export default function AdminAbout() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Form State initialized with your current About section data
  const [aboutData, setAboutData] = useState({
    badgeText: "About Our Institution",
    schoolName: "Shree Siddhababa Secondary School",
    location: "Pokhara, Gandaki Province, Nepal",
    schoolCode: "SSSS-38012",
    affiliation: "NEB / Govt. Accredited",
    estYear: "2046 BS",
    overview:
      "Shree Siddhababa Secondary School is a premier educational institution committed to academic excellence, technological skill advancement, and value-based learning. Serving students from Class 1 through Class 12, we bridge traditional education with modern practical streams including Computer Engineering and Hotel Management.",
    imageFile: null, // Stores actual File object for API upload
    imagePreview:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80", // Holds blob URL or default image
    imageTagline: "Campus Life",
    imageHeading: "Nurturing Tomorrow's Leaders",
    heading: "Empowering Minds, Shaping Futures",
    subheading:
      "Our vision is to cultivate an engaging learning environment where students excel academically, develop critical problem-solving capabilities, and grow into responsible global citizens.",
    highlights: [
      {
        title: "Quality Accreditation",
        desc: "Fully government-recognized with high NEB academic standards.",
      },
      {
        title: "Safe & Disciplined",
        desc: "Inclusive campus environment fostering mutual respect and values.",
      },
      {
        title: "Experienced Faculty",
        desc: "Dedicated teachers and mentors driving student success.",
      },
      {
        title: "Practical Learning",
        desc: "Hands-on tech, science, and hotel management practical labs.",
      },
    ],
  });

  const handleInputChange = (field, value) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
  };

  const handleHighlightChange = (index, field, value) => {
    const updated = [...aboutData.highlights];
    updated[index][field] = value;
    setAboutData((prev) => ({ ...prev, highlights: updated }));
  };

  // Handler for file selection via File Picker or Drag-and-Drop
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Insert FormData / API call here to send aboutData + aboutData.imageFile to backend
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Fixed icons mapped to indices for preview rendering
  const highlightIcons = [
    <RiAwardLine className="w-5 h-5 text-amber-400" />,
    <RiShieldCheckLine className="w-5 h-5 text-amber-400" />,
    <RiGroupLine className="w-5 h-5 text-amber-400" />,
    <RiBookOpenLine className="w-5 h-5 text-amber-400" />,
  ];

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
          {/* Editor/Preview Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold">
            <button
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

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {isSaved ? <RiCheckDoubleLine className="w-4 h-4" /> : <RiSave3Line className="w-4 h-4" />}
            <span>{isSaved ? "Saved!" : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EDITOR FORM */}
      {activeTab === "editor" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header & Meta Badges Panel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
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
                value={aboutData.overview}
                onChange={(e) => handleInputChange("overview", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Media & Content Panel with Drag & Drop Image Uploader */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              2. Campus Banner & Vision
            </h2>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Campus Banner Image
              </label>

              {/* Custom Image Upload Zone */}
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

                {/* Thumbnail Preview Box */}
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
                  value={aboutData.imageTagline}
                  onChange={(e) => handleInputChange("imageTagline", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Image Card Title
                </label>
                <input
                  type="text"
                  value={aboutData.imageHeading}
                  onChange={(e) => handleInputChange("imageHeading", e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vision Heading
                </label>
                <input
                  type="text"
                  value={aboutData.heading}
                  onChange={(e) => handleInputChange("heading", e.target.value)}
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
                value={aboutData.subheading}
                onChange={(e) => handleInputChange("subheading", e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Highlights Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              3. Core Highlights (4 Cards)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {aboutData.highlights.map((item, idx) => (
                <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Card #{idx + 1}
                  </span>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleHighlightChange(idx, "title", e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Description</label>
                    <input
                      type="text"
                      value={item.desc}
                      onChange={(e) => handleHighlightChange(idx, "desc", e.target.value)}
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

          {/* RENDER OF YOUR ABOUT SECTION USING UPLOADED PREVIEW IMAGE */}
          <section className="relative py-16 bg-slate-900 text-slate-100 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
              <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                      <RiBankLine className="w-3.5 h-3.5" />
                      <span>{aboutData.badgeText}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {aboutData.schoolName}
                    </h1>
                    <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                      <RiMapPinLine className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{aboutData.location}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        School Code / ID
                      </p>
                      <p className="text-xs font-bold text-amber-400 font-mono">
                        {aboutData.schoolCode}
                      </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Affiliation
                      </p>
                      <p className="text-xs font-bold text-slate-200">
                        {aboutData.affiliation}
                      </p>
                    </div>

                    <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Est. Year
                      </p>
                      <p className="text-xs font-bold text-amber-300">
                        {aboutData.estYear}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                  {aboutData.overview}
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
                      {aboutData.imageTagline}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {aboutData.imageHeading}
                    </h3>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {aboutData.heading}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {aboutData.subheading}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {aboutData.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                      >
                        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                          {highlightIcons[idx] || <RiAwardLine className="w-5 h-5 text-amber-400" />}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-bold text-slate-100">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-normal">
                            {item.desc}
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