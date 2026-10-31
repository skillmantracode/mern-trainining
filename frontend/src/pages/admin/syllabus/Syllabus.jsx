
import React, { useEffect, useMemo, useState } from "react";
import {
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilePdf2Line,
  RiSearchLine,
  RiAddLine,
  RiEditLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiDownloadLine,
  RiUploadCloud2Line,
  RiCloseLine,
  RiRefreshLine,
  RiSaveLine,
  RiLoader4Line,
  RiArrowRightLine,
  RiFilter3Line,
  RiFileList3Line,
} from "react-icons/ri";
import toast from "react-hot-toast";

import {
  getSyllabus,
  createSyllabus,
  updateSyllabus,
  deleteSyllabus,
} from "../../../services/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const grades = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);

const programs = [
  "General",
  "Hotel Management",
  "Computer Engineering",
];

const initialForm = {
  title: "",
  grade: "Class 1",
  program: "General",
  subjects: "",
  pdfFile: null,
  pdfName: "",
};

const getPdfUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
};

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
          <Icon size={23} />
        </div>
      </div>
    </div>
  );
}

export default function AdminSyllabusSection() {
  const [activeTab, setActiveTab] = useState("manage");
  const [syllabusData, setSyllabusData] = useState([]);
  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);
  const [removeExistingPdf, setRemoveExistingPdf] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");

  const loadSyllabus = async () => {
    try {
      setLoading(true);

      const res = await getSyllabus();

      if (res?.success) {
        setSyllabusData(res.syllabus || []);
      } else {
        toast.error(res?.message || "Unable to load syllabuses");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to load syllabuses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSyllabus();
  }, []);

  const filteredSyllabus = useMemo(() => {
    return syllabusData.filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.subjects?.toLowerCase().includes(search.toLowerCase());

      const matchesGrade =
        selectedGrade === "All Grades" || item.grade === selectedGrade;

      const matchesProgram =
        selectedProgram === "All Programs" ||
        item.program === selectedProgram;

      return matchesSearch && matchesGrade && matchesProgram;
    });
  }, [syllabusData, search, selectedGrade, selectedProgram]);

  const pdfCount = syllabusData.filter((item) => item.pdfUrl).length;
  const gradeCount = new Set(syllabusData.map((item) => item.grade)).size;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF file");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("PDF size must be less than 5 MB");
      e.target.value = "";
      return;
    }

    setForm((prev) => ({ ...prev, pdfFile: file }));
    setRemoveExistingPdf(false);
  };

  const handleRemovePdf = () => {
    if (form.pdfFile) {
      setForm((prev) => ({ ...prev, pdfFile: null }));
      return;
    }

    if (form.pdfName) {
      setForm((prev) => ({ ...prev, pdfName: "" }));
      setRemoveExistingPdf(true);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setRemoveExistingPdf(false);
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title || "",
      grade: item.grade || "Class 1",
      program: item.program || "General",
      subjects: item.subjects || "",
      pdfFile: null,
      pdfName: item.pdfName || "",
    });

    setEditingId(item._id);
    setRemoveExistingPdf(false);
    setActiveTab("manage");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.subjects.trim()) {
      toast.error("Please complete all required fields");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("grade", form.grade);
      formData.append("program", form.program);
      formData.append("subjects", form.subjects.trim());

      if (form.pdfFile) {
        formData.append("pdf", form.pdfFile);
      }

      if (removeExistingPdf) {
        formData.append("removePdf", "true");
      }

      const res = editingId
        ? await updateSyllabus(editingId, formData)
        : await createSyllabus(formData);

      if (!res?.success) {
        toast.error(res?.message || "Unable to save syllabus");
        return;
      }

      toast.success(res.message || "Syllabus saved successfully");
      resetForm();
      await loadSyllabus();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to save syllabus"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this syllabus?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await deleteSyllabus(id);

      if (!res?.success) {
        toast.error(res?.message || "Unable to delete syllabus");
        return;
      }

      toast.success(res.message || "Syllabus deleted successfully");

      if (editingId === id) resetForm();

      await loadSyllabus();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to delete syllabus"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const displayedPdfName = form.pdfFile?.name || form.pdfName;

  return (
    <div className="min-h-screen space-y-7 bg-slate-50/70 p-4 sm:p-6 lg:p-8">

      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-indigo-600">
            <RiGraduationCapLine size={19} />
            Academic Administration
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Syllabus Management
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            Organize academic syllabuses, manage subject information, and
            publish downloadable PDF resources for students.
          </p>
        </div>

        <button
          type="button"
          onClick={loadSyllabus}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 disabled:opacity-60"
        >
          <RiRefreshLine
            size={18}
            className={loading ? "animate-spin" : ""}
          />
          Refresh Data
        </button>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          icon={RiBookOpenLine}
          label="Total Syllabuses"
          value={syllabusData.length}
          description="Academic records available"
        />

        <StatCard
          icon={RiFilePdf2Line}
          label="PDF Documents"
          value={pdfCount}
          description="Downloadable syllabus files"
        />

        <StatCard
          icon={RiGraduationCapLine}
          label="Grades Covered"
          value={gradeCount}
          description="Grades with syllabus records"
        />
      </div>

      {/* MAIN TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("manage")}
            className={`relative flex items-center gap-2 pb-4 text-sm font-semibold transition ${
              activeTab === "manage"
                ? "text-indigo-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <RiFileList3Line size={18} />
            Manage Syllabus

            {activeTab === "manage" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-indigo-600" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`relative flex items-center gap-2 pb-4 text-sm font-semibold transition ${
              activeTab === "preview"
                ? "text-indigo-600"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <RiEyeLine size={18} />
            Public Preview

            {activeTab === "preview" && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-indigo-600" />
            )}
          </button>
        </div>

        <span className="mb-3 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
          {filteredSyllabus.length} records
        </span>
      </div>

      {activeTab === "manage" ? (
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">

          {/* EDITOR */}
          <div className="xl:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-white px-5 py-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      {editingId ? "Edit Syllabus" : "Create Syllabus"}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {editingId
                        ? "Update the selected academic record"
                        : "Add a new academic syllabus"}
                    </p>
                  </div>

                  <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                    {editingId ? (
                      <RiEditLine size={21} />
                    ) : (
                      <RiAddLine size={21} />
                    )}
                  </div>
                </div>
              </div>

              <form onSubmit={handleSave} className="space-y-5 p-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Syllabus Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Class 10 Science Syllabus"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Grade
                    </label>

                    <select
                      name="grade"
                      value={form.grade}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    >
                      {grades.map((grade) => (
                        <option key={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Program
                    </label>

                    <select
                      name="program"
                      value={form.program}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-3 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    >
                      {programs.map((program) => (
                        <option key={program}>{program}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subjects <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    name="subjects"
                    value={form.subjects}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="English, Nepali, Mathematics, Science..."
                    className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                  />

                  <p className="mt-1.5 text-xs text-slate-400">
                    Separate subject names with commas.
                  </p>
                </div>

                {/* PDF UPLOAD */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Syllabus PDF
                  </label>

                  <label className="group flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-4 py-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40">
                    <div className="mb-3 rounded-xl bg-white p-3 text-indigo-600 shadow-sm transition group-hover:scale-105">
                      <RiUploadCloud2Line size={25} />
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                      Click to upload a PDF
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF format · Maximum file size 5 MB
                    </p>

                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />
                  </label>

                  {displayedPdfName && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                      <div className="rounded-lg bg-red-50 p-2.5 text-red-500">
                        <RiFilePdf2Line size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-700">
                          {displayedPdfName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {form.pdfFile ? "New PDF selected" : "Existing PDF"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemovePdf}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title="Remove PDF"
                      >
                        <RiCloseLine size={19} />
                      </button>
                    </div>
                  )}

                  {removeExistingPdf && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      Existing PDF will be deleted after saving.
                    </p>
                  )}
                </div>

                <div className="flex gap-3 border-t border-slate-100 pt-5">
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <RiLoader4Line className="animate-spin" size={18} />
                    ) : (
                      <RiSaveLine size={18} />
                    )}
                    {saving
                      ? "Saving..."
                      : editingId
                        ? "Update Syllabus"
                        : "Save Syllabus"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SYLLABUS LIST */}
          <div className="min-w-0 xl:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      All Syllabuses
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Manage your published academic resources
                    </p>
                  </div>

                  <div className="relative w-full lg:max-w-xs">
                    <RiSearchLine
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search syllabus..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <select
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400"
                  >
                    <option>All Grades</option>
                    {grades.map((grade) => (
                      <option key={grade}>{grade}</option>
                    ))}
                  </select>

                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-indigo-400"
                  >
                    <option>All Programs</option>
                    {programs.map((program) => (
                      <option key={program}>{program}</option>
                    ))}
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-20">
                  <RiLoader4Line
                    size={30}
                    className="animate-spin text-indigo-600"
                  />
                </div>
              ) : filteredSyllabus.length === 0 ? (
                <div className="px-5 py-20 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <RiBookOpenLine size={27} />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No syllabuses found
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Try another search or add a new syllabus.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredSyllabus.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-50/70 sm:flex-row sm:items-center"
                    >
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="shrink-0 rounded-xl bg-indigo-50 p-3 text-indigo-600">
                          <RiFileList3Line size={23} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-slate-800">
                            {item.title}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                              {item.grade}
                            </span>

                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                              {item.program}
                            </span>
                          </div>

                          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {item.subjects}
                          </p>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                            <RiFilePdf2Line size={15} />
                            {item.pdfName || "No PDF attached"}
                          </div>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2">
                        {item.pdfUrl && (
                          <a
                            href={getPdfUrl(item.pdfUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View PDF"
                            className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <RiDownloadLine size={18} />
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          title="Edit syllabus"
                          className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <RiEditLine size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          title="Delete syllabus"
                          className="rounded-lg border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deletingId === item._id ? (
                            <RiLoader4Line
                              size={18}
                              className="animate-spin"
                            />
                          ) : (
                            <RiDeleteBinLine size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* PUBLIC PREVIEW */
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <RiFilter3Line size={20} className="text-indigo-600" />
              <h2 className="font-bold text-slate-900">
                Preview Filters
              </h2>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option>All Grades</option>
                {grades.map((grade) => (
                  <option key={grade}>{grade}</option>
                ))}
              </select>

              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option>All Programs</option>
                {programs.map((program) => (
                  <option key={program}>{program}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Public Syllabus Preview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                This is how syllabus cards will appear to visitors.
              </p>
            </div>

            <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              {filteredSyllabus.length} results
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center rounded-2xl border border-slate-200 bg-white py-20">
              <RiLoader4Line
                size={30}
                className="animate-spin text-indigo-600"
              />
            </div>
          ) : filteredSyllabus.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <RiBookOpenLine
                size={38}
                className="mx-auto text-slate-300"
              />
              <p className="mt-3 font-semibold text-slate-700">
                No syllabus available
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Add a syllabus to see it in the public preview.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredSyllabus.map((item) => (
                <div
                  key={item._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 p-5">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                      <RiGraduationCapLine size={25} />
                    </div>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm">
                      {item.grade}
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      {item.program}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <div className="mt-5">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                        Subjects
                      </p>

                      <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                        {item.subjects || "No subjects added"}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-slate-100 pt-4">
                      {item.pdfUrl ? (
                        <a
                          href={getPdfUrl(item.pdfUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          <RiDownloadLine size={18} />
                          View Syllabus PDF
                          <RiArrowRightLine
                            size={17}
                            className="transition group-hover:translate-x-1"
                          />
                        </a>
                      ) : (
                        <div className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-400">
                          PDF not available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
