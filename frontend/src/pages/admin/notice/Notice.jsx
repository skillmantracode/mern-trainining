import React, { useState } from "react";
import {
  RiCalendarLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiGraduationCapLine,
  RiSparklingLine,
  RiGroupLine,
  RiUserAddLine,
  RiExternalLinkLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiNotification3Line,
} from "react-icons/ri";

export default function AdminNoticeSection() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Available Icon Options mapped to key strings for simple dynamic selection
  const iconOptions = [
    { key: "userAdd", label: "User / Admission", color: "amber" },
    { key: "graduation", label: "Graduation / Exam", color: "rose" },
    { key: "sparkling", label: "Sparkling / Holiday", color: "emerald" },
    { key: "group", label: "Group / Meeting", color: "sky" },
  ];

  // Helper to render icon component with appropriate colors
  const renderNoticeIcon = (key, isHero = false) => {
    const sizeClass = isHero ? "w-7 h-7" : "w-5 h-5";
    switch (key) {
      case "userAdd":
        return <RiUserAddLine className={`${sizeClass} text-amber-600`} />;
      case "graduation":
        return (
          <RiGraduationCapLine className={`${sizeClass} text-rose-600`} />
        );
      case "sparkling":
        return <RiSparklingLine className={`${sizeClass} text-emerald-600`} />;
      case "group":
        return <RiGroupLine className={`${sizeClass} text-sky-600`} />;
      default:
        return <RiUserAddLine className={`${sizeClass} text-amber-600`} />;
    }
  };

  const getIconBg = (key) => {
    switch (key) {
      case "userAdd":
        return "bg-amber-100";
      case "graduation":
        return "bg-rose-100";
      case "sparkling":
        return "bg-emerald-100";
      case "group":
        return "bg-sky-100";
      default:
        return "bg-amber-100";
    }
  };

  // State for all Notices
  const [notices, setNotices] = useState([
    {
      id: 1,
      isHero: true,
      iconKey: "userAdd",
      categoryNepali: "भर्ना",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      title: "Class 11 Academic Admission Open for Session 2083/84",
      description:
        "Applications are officially open for Science, Management, Hotel Management, and Computer Engineering streams. Online forms and entrance exam schedules are available now.",
      date: "August 01, 2026",
      pdfName: "Admission_Notice_2083.pdf",
      pdfUrl: "#",
    },
    {
      id: 2,
      isHero: false,
      iconKey: "graduation",
      categoryNepali: "परीक्षा",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      title: "SEE Board Examination Result 2082 Published",
      description:
        "Congratulations to all students! Shree Siddhababa achieved a 98% pass rate. Marksheets and toppers list are available at the admin office.",
      date: "July 15, 2026",
      pdfName: "SEE_Result_2082.pdf",
      pdfUrl: "#",
    },
    {
      id: 3,
      isHero: false,
      iconKey: "sparkling",
      categoryNepali: "बिदा",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      title: "Dashain Vacation & Holiday Notice",
      description:
        "School will remain closed for the Dashain festival celebration. Regular academic classes will resume promptly as scheduled.",
      date: "October 10, 2026",
      pdfName: "Dashain_Vacation.pdf",
      pdfUrl: "#",
    },
    {
      id: 4,
      isHero: false,
      iconKey: "group",
      categoryNepali: "बैठक",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: false,
      title: "Parent-Teacher Meeting - Grade 11 & 12",
      description:
        "Mandatory PTM for Hotel Management and Computer Engineering streams to discuss first terminal exam reports.",
      date: "September 05, 2026",
      pdfName: "PTM_Schedule.pdf",
      pdfUrl: "#",
    },
  ]);

  // Form State for Adding / Editing a Notice Item
  const [currentNotice, setCurrentNotice] = useState({
    isHero: false,
    iconKey: "userAdd",
    categoryNepali: "भर्ना",
    categoryEnglish: "SCHOOL NOTICE",
    isImportant: false,
    title: "",
    description: "",
    date: "",
    pdfFile: null,
    pdfName: "",
  });

  const [editingId, setEditingId] = useState(null);

  // PDF Upload Handler
  const handlePdfUpload = (file) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf"))) {
      setCurrentNotice((prev) => ({
        ...prev,
        pdfFile: file,
        pdfName: file.name,
      }));
    }
  };

  const handleRemovePdf = () => {
    setCurrentNotice((prev) => ({
      ...prev,
      pdfFile: null,
      pdfName: "",
    }));
  };

  // Form Submit Handler
  const handleSaveNotice = (e) => {
    e.preventDefault();
    if (!currentNotice.title.trim()) return;

    let updatedList = [...notices];

    // If current notice is flagged as Hero/Featured, turn off isHero for all other notices
    if (currentNotice.isHero) {
      updatedList = updatedList.map((n) => ({ ...n, isHero: false }));
    }

    if (editingId) {
      updatedList = updatedList.map((item) =>
        item.id === editingId ? { ...currentNotice, id: editingId } : item
      );
      setEditingId(null);
    } else {
      updatedList.unshift({ ...currentNotice, id: Date.now() });
    }

    setNotices(updatedList);

    // Reset Form
    setCurrentNotice({
      isHero: false,
      iconKey: "userAdd",
      categoryNepali: "भर्ना",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: false,
      title: "",
      description: "",
      date: "",
      pdfFile: null,
      pdfName: "",
    });
  };

  const handleEditClick = (notice) => {
    setCurrentNotice(notice);
    setEditingId(notice.id);
  };

  const handleDeleteClick = (id) => {
    setNotices((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentNotice({
        isHero: false,
        iconKey: "userAdd",
        categoryNepali: "भर्ना",
        categoryEnglish: "SCHOOL NOTICE",
        isImportant: false,
        title: "",
        description: "",
        date: "",
        pdfFile: null,
        pdfName: "",
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    // Submit notices array to Backend API
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const heroNotice = notices.find((n) => n.isHero);
  const gridNotices = notices.filter((n) => !n.isHero);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Controls & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Notice Board & Announcements
          </h1>
          <p className="text-xs text-slate-500">
            Create, update, set featured notice, upload PDF files, and preview real-time changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Switcher */}
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
          {/* FORM: ADD OR EDIT NOTICE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                1. {editingId ? "Edit Notice Announcement" : "Create New Notice Announcement"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentNotice({
                      isHero: false,
                      iconKey: "userAdd",
                      categoryNepali: "भर्ना",
                      categoryEnglish: "SCHOOL NOTICE",
                      isImportant: false,
                      title: "",
                      description: "",
                      date: "",
                      pdfFile: null,
                      pdfName: "",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              {/* Feature / Priority Toggles */}
              <div className="flex flex-wrap items-center gap-6 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={currentNotice.isHero}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        isHero: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span>Set as Featured / Big Banner Notice</span>
                </label>

                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={currentNotice.isImportant}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        isImportant: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-amber-500 rounded border-slate-300 focus:ring-amber-500"
                  />
                  <span className="text-amber-700 font-bold">
                    Mark as "Important" Tag
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notice Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Class 11 Academic Admission Open 2083"
                    value={currentNotice.title}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category (Nepali Badge)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. भर्ना / परीक्षा / बिदा / बैठक"
                    value={currentNotice.categoryNepali}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        categoryNepali: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Icon Theme
                  </label>
                  <select
                    value={currentNotice.iconKey}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
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

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notice Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about the notice announcement..."
                    value={currentNotice.description}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publication Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. August 01, 2026"
                      value={currentNotice.date}
                      onChange={(e) =>
                        setCurrentNotice((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* PDF File Picker Zone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Attach Official Document (PDF)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-lg cursor-pointer bg-slate-50 text-slate-600 hover:bg-amber-50/30 transition-colors">
                        <RiUploadCloud2Line className="w-4 h-4 text-amber-500" />
                        <span className="text-xs truncate">
                          {currentNotice.pdfName || "Upload PDF Document"}
                        </span>
                        <input
                          type="file"
                          accept="application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handlePdfUpload(e.target.files[0]);
                            }
                          }}
                        />
                      </label>

                      {currentNotice.pdfName && (
                        <button
                          type="button"
                          onClick={handleRemovePdf}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      )}
                    </div>
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
                    {editingId ? "Update Notice" : "Publish Announcement"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* LIST: MANAGED NOTICES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              2. Published Notices ({notices.length})
            </h2>

            {notices.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No notices published yet. Use the form above to add one.
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      item.isHero
                        ? "bg-amber-50/50 border-amber-300 shadow-xs"
                        : "bg-slate-50/60 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2.5 rounded-xl ${getIconBg(
                          item.iconKey
                        )} shrink-0 mt-0.5`}
                      >
                        {renderNoticeIcon(item.iconKey)}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {item.isHero && (
                            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase">
                              Hero Banner
                            </span>
                          )}
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-bold">
                            {item.categoryNepali}
                          </span>
                          {item.isImportant && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 text-[10px] font-bold">
                              Important
                            </span>
                          )}
                          <span className="text-[11px] font-medium text-slate-400">
                            • {item.date}
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-slate-900">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 w-full sm:w-auto justify-end">
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
            <span>PREVIEW MODE: Notice Board UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section className="py-16 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Section Title */}
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Notice Board & Announcements
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Stay updated with official academic notices, exam schedules, and events from Shree Siddhababa Secondary School.
                </p>
              </div>

              {/* 1. HERO / BIG FEATURED NOTICE */}
              {heroNotice ? (
                <div className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 sm:p-8 shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <div
                          className={`p-2.5 rounded-2xl ${getIconBg(
                            heroNotice.iconKey
                          )} shrink-0`}
                        >
                          {renderNoticeIcon(heroNotice.iconKey, true)}
                        </div>
                        <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                          {heroNotice.categoryNepali}
                        </span>
                        <span className="text-[11px] font-bold tracking-wider uppercase text-slate-400">
                          {heroNotice.categoryEnglish}
                        </span>

                        {heroNotice.isImportant && (
                          <span className="ml-auto md:ml-0 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
                            <RiErrorWarningLine className="w-3.5 h-3.5" />
                            Important
                          </span>
                        )}
                      </div>

                      {/* Big Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                        {heroNotice.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        {heroNotice.description}
                      </p>

                      {/* Date stamp */}
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pt-2">
                        <RiCalendarLine className="w-4 h-4 text-slate-400" />
                        <span>Published on {heroNotice.date}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="shrink-0 flex items-center md:flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 gap-3">
                      <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-95 shadow-md">
                        <RiDownloadLine className="w-4 h-4" />
                        <span>Download PDF</span>
                        <RiExternalLinkLine className="w-3.5 h-3.5 opacity-70" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 bg-white border border-dashed rounded-3xl">
                  No notice set as Featured Banner yet. Toggle "Set as Featured" in the editor.
                </div>
              )}

              {/* 2. GRID NOTICES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gridNotices.map((item) => (
                  <div
                    key={item.id}
                    className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Card Header Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-2 rounded-xl ${getIconBg(
                              item.iconKey
                            )}`}
                          >
                            {renderNoticeIcon(item.iconKey)}
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                            {item.categoryNepali}
                          </span>
                        </div>

                        {item.isImportant && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-semibold">
                            <RiErrorWarningLine className="w-3 h-3" />
                            Important
                          </span>
                        )}
                      </div>

                      <p className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                        {item.categoryEnglish}
                      </p>

                      {/* Notice Title */}
                      <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Footer */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                        <RiCalendarLine className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors">
                          <RiDownloadLine className="w-3.5 h-3.5" />
                          <span>Download PDF</span>
                          <RiExternalLinkLine className="w-3 h-3 opacity-60" />
                        </button>

                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                      </div>
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