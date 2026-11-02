import React, { useEffect, useState } from "react";
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
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiNotification3Line,
} from "react-icons/ri";

import {
  getNotices,
  getNoticeById,
  createNotice,
  updateNotice,
  deleteNotice,
} from "../../../services/api";

import toast from "react-hot-toast";

const initialNotice = {
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
  removePdf: false,
};

const iconOptions = [
  { key: "userAdd", label: "User / Admission" },
  { key: "graduation", label: "Graduation / Exam" },
  { key: "sparkling", label: "Sparkling / Holiday" },
  { key: "group", label: "Group / Meeting" },
];

const getDateInputValue = (date) => {
  if (!date) return "";

  // Preserve date-only strings without timezone conversion.
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toISOString().split("T")[0];
};

const formatNoticeDate = (date) => {
  if (!date) return "Date not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

export default function AdminNoticeSection() {
  const [activeTab, setActiveTab] = useState("editor");

  const [notices, setNotices] = useState([]);
  const [currentNotice, setCurrentNotice] = useState(initialNotice);

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const iconOptionsList = iconOptions;

  // Backend PDF base URL.
  const API_URL = "http://localhost:5000";

  // --------------------------------------------------
  // FETCH ALL NOTICES
  // --------------------------------------------------

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await getNotices();

      if (res?.success) {
        setNotices(res.notices || []);
      } else {
        toast.error(res?.message || "Failed to load notices");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load notices"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // --------------------------------------------------
  // ICON HELPERS
  // --------------------------------------------------

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
        return (
          <RiSparklingLine className={`${sizeClass} text-emerald-600`} />
        );

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

  // --------------------------------------------------
  // RESET FORM
  // --------------------------------------------------

  const resetForm = () => {
    setCurrentNotice({ ...initialNotice });
    setEditingId(null);
  };

  // --------------------------------------------------
  // PDF HANDLERS
  // --------------------------------------------------

  const handlePdfUpload = (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("PDF size must be less than 5MB");
      return;
    }

    setCurrentNotice((prev) => ({
      ...prev,
      pdfFile: file,
      pdfName: file.name,
      removePdf: false,
    }));
  };

  const handleRemovePdf = () => {
    setCurrentNotice((prev) => ({
      ...prev,
      pdfFile: null,
      pdfName: "",
      removePdf: true,
    }));
  };

  // --------------------------------------------------
  // CREATE / UPDATE NOTICE
  // --------------------------------------------------

  const handleSaveNotice = async (e) => {
    e.preventDefault();

    if (!currentNotice.title.trim()) {
      toast.error("Notice title is required");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("title", currentNotice.title.trim());
      formData.append("description", currentNotice.description);
      formData.append("categoryNepali", currentNotice.categoryNepali);
      formData.append("categoryEnglish", currentNotice.categoryEnglish);
      formData.append("iconKey", currentNotice.iconKey);
      formData.append("isHero", String(currentNotice.isHero));
      formData.append("isImportant", String(currentNotice.isImportant));
      formData.append("date", currentNotice.date);

      if (currentNotice.pdfFile) {
        formData.append("pdf", currentNotice.pdfFile);
      }

      // Tell backend to remove the previously uploaded PDF.
      if (currentNotice.removePdf) {
        formData.append("removePdf", "true");
      }

      let res;

      if (editingId) {
        res = await updateNotice(editingId, formData);
      } else {
        res = await createNotice(formData);
      }

      if (res?.success) {
        toast.success(
          res.message ||
            (editingId
              ? "Notice updated successfully"
              : "Notice published successfully")
        );

        resetForm();
        await fetchNotices();
      } else {
        toast.error(res?.message || "Unable to save notice");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // EDIT NOTICE
  // --------------------------------------------------

  const handleEditClick = async (id) => {
    try {
      const res = await getNoticeById(id);

      if (!res?.success || !res.notice) {
        toast.error(res?.message || "Notice not found");
        return;
      }

      const notice = res.notice;

      setCurrentNotice({
        isHero: notice.isHero || false,
        iconKey: notice.iconKey || "userAdd",
        categoryNepali: notice.categoryNepali || "",
        categoryEnglish: notice.categoryEnglish || "SCHOOL NOTICE",
        isImportant: notice.isImportant || false,
        title: notice.title || "",
        description: notice.description || "",
        date: getDateInputValue(notice.date),
        pdfFile: null,
        pdfName: notice.pdfName || "",
        removePdf: false,
      });

      setEditingId(notice._id);
      setActiveTab("editor");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load notice"
      );
    }
  };

  // --------------------------------------------------
  // DELETE NOTICE
  // --------------------------------------------------

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await deleteNotice(id);

      if (res?.success) {
        toast.success(res.message || "Notice deleted successfully");

        setNotices((prev) => prev.filter((item) => item._id !== id));

        if (editingId === id) {
          resetForm();
        }
      } else {
        toast.error(res?.message || "Failed to delete notice");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete notice"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // NOTICE DATA
  // --------------------------------------------------

  const heroNotice = notices.find((notice) => notice.isHero);

  const gridNotices = notices.filter((notice) => !notice.isHero);

  const getPdfUrl = (pdfName) => {
    if (!pdfName) return null;

    return `${API_URL}/uploads/notices/${encodeURIComponent(pdfName)}`;
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Notice Board & Announcements
          </h1>

          <p className="text-xs text-slate-500">
            Create, update, feature, and manage school notices.
          </p>
        </div>

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
            Editor
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
            Live Preview
          </button>
        </div>
      </div>

      {/* EDITOR */}
      {activeTab === "editor" && (
        <div className="space-y-6">
          {/* FORM */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                {editingId ? "Edit Notice Announcement" : "Create New Notice"}
              </h2>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-4">
              {/* TOGGLES */}
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
                    className="w-4 h-4 text-amber-500 rounded border-slate-300"
                  />
                  Set as Featured / Big Banner Notice
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
                    className="w-4 h-4 text-amber-500 rounded border-slate-300"
                  />
                  <span className="text-amber-700 font-bold">
                    Mark as Important
                  </span>
                </label>
              </div>

              {/* TITLE / CATEGORY / ICON */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notice Title *
                  </label>

                  <input
                    type="text"
                    required
                    value={currentNotice.title}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g. Class 11 Academic Admission Open 2083"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category (Nepali)
                  </label>

                  <input
                    type="text"
                    value={currentNotice.categoryNepali}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        categoryNepali: e.target.value,
                      }))
                    }
                    placeholder="भर्ना / परीक्षा / बिदा"
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
                    {iconOptionsList.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* DESCRIPTION / DATE / PDF */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Notice Description
                  </label>

                  <textarea
                    rows={3}
                    value={currentNotice.description}
                    onChange={(e) =>
                      setCurrentNotice((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Provide details about the notice..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-4 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Publication Date
                    </label>

                    <input
                      type="date"
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

                  {/* PDF */}
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
                          accept=".pdf,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            handlePdfUpload(e.target.files?.[0]);
                            e.target.value = "";
                          }}
                        />
                      </label>

                      {currentNotice.pdfName && (
                        <button
                          type="button"
                          onClick={handleRemovePdf}
                          className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                          title="Remove PDF"
                        >
                          <RiDeleteBin6Line className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {currentNotice.pdfName && !currentNotice.pdfFile && (
                      <p className="text-[10px] text-slate-400 mt-1">
                        Existing PDF attached. Upload a new one to replace it.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs rounded-xl transition-all"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />

                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Notice"
                    : "Publish Announcement"}
                </button>
              </div>
            </form>
          </div>

          {/* NOTICE LIST */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">
            <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
              Published Notices ({notices.length})
            </h2>

            {loading ? (
              <p className="text-center py-8 text-sm text-slate-400">
                Loading notices...
              </p>
            ) : notices.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No notices published yet. Use the form above to add one.
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((item) => (
                  <div
                    key={item._id}
                    className={`p-4 border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.isHero
                        ? "bg-amber-50/50 border-amber-300 shadow-sm"
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
                            • {formatNoticeDate(item.date)}
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
                        onClick={() => handleEditClick(item._id)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-slate-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === item._id}
                        onClick={() => handleDeleteClick(item._id)}
                        className="px-3 py-1.5 bg-white border border-slate-200 hover:border-red-500 rounded-xl text-red-600 text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
                      >
                        <RiDeleteBin6Line className="w-3.5 h-3.5" />
                        {deletingId === item._id ? "Deleting..." : "Delete"}
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
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Notice Board UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          <NoticePreview
            heroNotice={heroNotice}
            gridNotices={gridNotices}
            renderNoticeIcon={renderNoticeIcon}
            getIconBg={getIconBg}
            getPdfUrl={getPdfUrl}
            formatNoticeDate={formatNoticeDate}
          />
        </div>
      )}
    </div>
  );
}

// --------------------------------------------------
// PREVIEW COMPONENT
// --------------------------------------------------

function NoticePreview({
  heroNotice,
  gridNotices,
  renderNoticeIcon,
  getIconBg,
  getPdfUrl,
  formatNoticeDate,
}) {
  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Notice Board & Announcements
          </h2>

          <p className="text-xs sm:text-sm text-slate-500">
            Stay updated with official academic notices, exam schedules, and
            events from Shree Siddhababa Secondary School.
          </p>
        </div>

        {/* FEATURED NOTICE */}
        {heroNotice ? (
          <div className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
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

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {heroNotice.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                  {heroNotice.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pt-2">
                  <RiCalendarLine className="w-4 h-4" />
                  <span>
                    Published on {formatNoticeDate(heroNotice.date)}
                  </span>
                </div>
              </div>

              {heroNotice.pdfName && (
                <div className="shrink-0 flex items-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8">
                  <a
                    href={getPdfUrl(heroNotice.pdfName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shadow-md"
                  >
                    <RiDownloadLine className="w-4 h-4" />
                    Download PDF
                    <RiExternalLinkLine className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-slate-400 bg-white border border-dashed rounded-3xl">
            No featured notice available.
          </div>
        )}

        {/* OTHER NOTICES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gridNotices.map((item) => (
            <NoticePreviewCard
              key={item._id}
              item={item}
              renderNoticeIcon={renderNoticeIcon}
              getIconBg={getIconBg}
              getPdfUrl={getPdfUrl}
              formatNoticeDate={formatNoticeDate}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function NoticePreviewCard({
  item,
  renderNoticeIcon,
  getIconBg,
  getPdfUrl,
  formatNoticeDate,
}) {
  return (
    <div className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${getIconBg(item.iconKey)}`}>
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

        <h4 className="text-base font-bold text-slate-900 line-clamp-2">
          {item.title}
        </h4>

        <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <RiCalendarLine className="w-3.5 h-3.5" />
          {formatNoticeDate(item.date)}
        </div>

        <div className="flex items-center justify-between">
          {item.pdfName ? (
            <a
              href={getPdfUrl(item.pdfName)}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition-colors"
            >
              <RiDownloadLine className="w-3.5 h-3.5" />
              Download PDF
              <RiExternalLinkLine className="w-3 h-3 opacity-60" />
            </a>
          ) : (
            <span className="text-[11px] text-slate-400">
              No PDF attached
            </span>
          )}

          <span className="w-2 h-2 rounded-full bg-amber-500" />
        </div>
      </div>
    </div>
  );
}