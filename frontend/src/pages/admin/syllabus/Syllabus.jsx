import React, { useState } from "react";
import {
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilter3Line,
  RiDownloadLine,
  RiFileTextLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
} from "react-icons/ri";

export default function AdminSyllabusSection() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Available Program Options
  const programOptions = [
    "General",
    "Hotel Management",
    "Computer Engineering",
  ];

  // Syllabus list state
  const [syllabusData, setSyllabusData] = useState([
    { id: 1, title: "Primary English & Nepali Curriculum", grade: "Class 1", program: "General", subjects: "English, Nepali, Math, Science", pdfName: "Class1_Curriculum.pdf", pdfUrl: "#" },
    { id: 2, title: "Basic Science & Mathematics Framework", grade: "Class 2", program: "General", subjects: "Math, Science, Social Studies", pdfName: "Class2_Framework.pdf", pdfUrl: "#" },
    { id: 3, title: "Elementary Learning Syllabus", grade: "Class 3", program: "General", subjects: "English, Nepali, Math, Science", pdfName: "Class3_Syllabus.pdf", pdfUrl: "#" },
    { id: 4, title: "Mid-Primary Core Curriculum", grade: "Class 4", program: "General", subjects: "Math, Science, Social, Computer", pdfName: "Class4_Curriculum.pdf", pdfUrl: "#" },
    { id: 5, title: "Primary Graduation Syllabus", grade: "Class 5", program: "General", subjects: "English, Nepali, Math, Science", pdfName: "Class5_Syllabus.pdf", pdfUrl: "#" },
    { id: 6, title: "Lower Secondary General Studies", grade: "Class 6", program: "General", subjects: "Science, Math, English, Social", pdfName: "Class6_General.pdf", pdfUrl: "#" },
    { id: 7, title: "Secondary Foundation Course", grade: "Class 7", program: "General", subjects: "Science, Math, Computer, Social", pdfName: "Class7_Foundation.pdf", pdfUrl: "#" },
    { id: 8, title: "Basic Level Examination Syllabus", grade: "Class 8", program: "General", subjects: "Core Subjects & Practical Labs", pdfName: "Class8_BLE.pdf", pdfUrl: "#" },
    { id: 9, title: "Secondary Education Framework", grade: "Class 9", program: "General", subjects: "Physics, Chem, Math, English", pdfName: "Class9_Framework.pdf", pdfUrl: "#" },
    { id: 10, title: "SEE Board Exam Preparation Syllabus", grade: "Class 10", program: "General", subjects: "Complete SEE Curriculum", pdfName: "Class10_SEE.pdf", pdfUrl: "#" },
    { id: 11, title: "Hotel Management Higher Secondary", grade: "Class 11", program: "Hotel Management", subjects: "Food Production, Front Office, Housekeeping", pdfName: "Class11_HM.pdf", pdfUrl: "#" },
    { id: 12, title: "Computer Engineering Tech Syllabus", grade: "Class 11", program: "Computer Engineering", subjects: "C Programming, Networking, Web Dev", pdfName: "Class11_Computer.pdf", pdfUrl: "#" },
    { id: 13, title: "Advanced Hotel Operations & Culinary", grade: "Class 12", program: "Hotel Management", subjects: "F&B Service, Hospitality Accounting", pdfName: "Class12_HM.pdf", pdfUrl: "#" },
    { id: 14, title: "Software & Systems Architecture", grade: "Class 12", program: "Computer Engineering", subjects: "DBMS, C++, Digital Logic", pdfName: "Class12_Computer.pdf", pdfUrl: "#" },
    { id: 15, title: "General Science Higher Secondary", grade: "Class 12", program: "General", subjects: "Physics, Chemistry, Biology, Math", pdfName: "Class12_Science.pdf", pdfUrl: "#" },
  ]);

  // Form State for Adding/Editing a Syllabus Entry
  const [currentSyllabus, setCurrentSyllabus] = useState({
    title: "",
    grade: "Class 1",
    program: "General",
    subjects: "",
    pdfFile: null,
    pdfName: "",
  });

  const [editingId, setEditingId] = useState(null);

  // Filters for Live Preview Mode
  const [previewSelectedGrade, setPreviewSelectedGrade] = useState("All Grades");
  const [previewSelectedProgram, setPreviewSelectedProgram] = useState("All Programs");

  // PDF File Upload Handler
  const handlePdfUpload = (file) => {
    if (file && (file.type === "application/pdf" || file.name.endsWith(".pdf"))) {
      setCurrentSyllabus((prev) => ({
        ...prev,
        pdfFile: file,
        pdfName: file.name,
      }));
    }
  };

  const handleRemovePdf = () => {
    setCurrentSyllabus((prev) => ({
      ...prev,
      pdfFile: null,
      pdfName: "",
    }));
  };

  // Form Submit Handler
  const handleSaveSyllabus = (e) => {
    e.preventDefault();
    if (!currentSyllabus.title.trim()) return;

    if (editingId) {
      setSyllabusData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentSyllabus, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setSyllabusData((prev) => [
        { ...currentSyllabus, id: Date.now() },
        ...prev,
      ]);
    }

    // Reset Form
    setCurrentSyllabus({
      title: "",
      grade: "Class 1",
      program: "General",
      subjects: "",
      pdfFile: null,
      pdfName: "",
    });
  };

  const handleEditClick = (item) => {
    setCurrentSyllabus(item);
    setEditingId(item.id);
  };

  const handleDeleteClick = (id) => {
    setSyllabusData((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentSyllabus({
        title: "",
        grade: "Class 1",
        program: "General",
        subjects: "",
        pdfFile: null,
        pdfName: "",
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Preview filtering logic
  const filteredPreviewSyllabus = syllabusData.filter((item) => {
    const matchesGrade =
      previewSelectedGrade === "All Grades" || item.grade === previewSelectedGrade;
    const matchesProgram =
      previewSelectedProgram === "All Programs" || item.program === previewSelectedProgram;
    return matchesGrade && matchesProgram;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Admin Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Academic Syllabus
          </h1>
          <p className="text-xs text-slate-500">
            Upload curriculum PDF documents, assign grade levels and programs, and preview output.
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
          {/* FORM: ADD OR EDIT SYLLABUS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                1. {editingId ? "Edit Syllabus Entry" : "Create New Syllabus Entry"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentSyllabus({
                      title: "",
                      grade: "Class 1",
                      program: "General",
                      subjects: "",
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

            <form onSubmit={handleSaveSyllabus} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Syllabus / Curriculum Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Engineering Tech Syllabus"
                    value={currentSyllabus.title}
                    onChange={(e) =>
                      setCurrentSyllabus((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Grade Level
                  </label>
                  <select
                    value={currentSyllabus.grade}
                    onChange={(e) =>
                      setCurrentSyllabus((prev) => ({
                        ...prev,
                        grade: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Program / Stream
                  </label>
                  <select
                    value={currentSyllabus.program}
                    onChange={(e) =>
                      setCurrentSyllabus((prev) => ({
                        ...prev,
                        program: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {programOptions.map((prog) => (
                      <option key={prog} value={prog}>
                        {prog}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Included Subjects / Topics
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. C Programming, Networking, Web Dev"
                    value={currentSyllabus.subjects}
                    onChange={(e) =>
                      setCurrentSyllabus((prev) => ({
                        ...prev,
                        subjects: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Syllabus Document (PDF)
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-lg cursor-pointer bg-slate-50 text-slate-600 hover:bg-amber-50/30 transition-colors">
                      <RiUploadCloud2Line className="w-4 h-4 text-amber-500" />
                      <span className="text-xs truncate">
                        {currentSyllabus.pdfName || "Select PDF File"}
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

                    {currentSyllabus.pdfName && (
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

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Syllabus" : "Add Syllabus Entry"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* LIST OF SYLLABUS ITEMS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              2. Uploaded Curriculum Documents ({syllabusData.length})
            </h2>

            {syllabusData.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No syllabus documents uploaded yet. Use the form above to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {syllabusData.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-50/60 space-y-3 hover:border-amber-400/60 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                          {item.grade}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {item.program}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>

                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        <strong className="text-slate-700">Subjects: </strong>
                        {item.subjects || "N/A"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/80">
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[120px]">
                        <RiFileTextLine className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                        <span className="truncate">{item.pdfName || "PDF Document"}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="px-2 py-1 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                          className="px-2 py-1 bg-white border border-slate-200 hover:border-red-500 rounded-lg text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                        >
                          <RiDeleteBin6Line className="w-3.5 h-3.5" />
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
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Available Syllabus UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section className="py-16 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Filter Controls Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-200">
                {/* Grade Filter */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <RiGraduationCapLine className="w-4 h-4 text-amber-600" />
                    <span>Filter by Grade</span>
                  </label>
                  <div className="relative">
                    <select
                      value={previewSelectedGrade}
                      onChange={(e) => setPreviewSelectedGrade(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-700 shadow-xs outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="All Grades">All Grades (Class 1 - 12)</option>
                      {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(
                        (grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        )
                      )}
                    </select>
                    <RiFilter3Line className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Program Filter */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <RiBookOpenLine className="w-4 h-4 text-amber-600" />
                    <span>Filter by Program</span>
                  </label>
                  <div className="relative">
                    <select
                      value={previewSelectedProgram}
                      onChange={(e) => setPreviewSelectedProgram(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-700 shadow-xs outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="All Programs">All Programs</option>
                      <option value="General">General Education</option>
                      <option value="Hotel Management">Hotel Management</option>
                      <option value="Computer Engineering">
                        Computer Engineering
                      </option>
                    </select>
                    <RiFilter3Line className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">
                    ACADEMIC RESOURCES
                  </p>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Available Syllabus
                  </h2>
                </div>
                <div className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-slate-500 shadow-xs">
                  {filteredPreviewSyllabus.length} syllabus found
                </div>
              </div>

              {/* Syllabus Cards Grid */}
              {filteredPreviewSyllabus.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs bg-white border border-dashed rounded-3xl">
                  No syllabus found matching your selected filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {filteredPreviewSyllabus.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-[11px] font-semibold">
                            {item.grade}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                            {item.program}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed">
                          <strong className="text-slate-700">Subjects: </strong>
                          {item.subjects}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <RiFileTextLine className="w-4 h-4" />
                          <span>PDF Document</span>
                        </div>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors">
                          <RiDownloadLine className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
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