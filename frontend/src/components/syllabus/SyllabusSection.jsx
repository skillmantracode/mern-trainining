
import React, { useEffect, useState } from "react";
import {
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilter3Line,
  RiDownloadLine,
  RiFileTextLine,
  RiLoader4Line,
  RiRefreshLine,
} from "react-icons/ri";

import { getSyllabus } from "../../services/api";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function SyllabusSection() {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");

  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch syllabus whenever filters change
  useEffect(() => {
    let ignore = false;

    const fetchSyllabus = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getSyllabus({
          grade: selectedGrade,
          program: selectedProgram,
        });

        if (!ignore && res?.success) {
          setSyllabusData(res.syllabus || []);
        } else if (!ignore) {
          setSyllabusData([]);
          setError(res?.message || "Failed to load syllabus.");
        }
      } catch (error) {
        if (!ignore) {
          setSyllabusData([]);
          setError(
            error.response?.data?.message ||
              "Unable to load syllabus. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchSyllabus();

    return () => {
      ignore = true;
    };
  }, [selectedGrade, selectedProgram]);

  // PDF URL
  const getPdfUrl = (pdfUrl) => {
    if (!pdfUrl) return "";

    // Supports both relative paths and complete URLs
    if (pdfUrl.startsWith("http")) {
      return pdfUrl;
    }

    return `${API_BASE_URL}${pdfUrl}`;
  };

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* FILTER CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-slate-200">

          {/* Grade Filter */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <RiGraduationCapLine className="w-4 h-4 text-amber-600" />
              <span>Filter by Grade</span>
            </label>

            <div className="relative">
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-700 shadow-xs outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
              >
                <option value="All Grades">
                  All Grades (Class 1 - 12)
                </option>

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
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs font-medium text-slate-700 shadow-xs outline-none focus:border-amber-500 transition-all appearance-none cursor-pointer"
              >
                <option value="All Programs">All Programs</option>
                <option value="General">General Education</option>
                <option value="Hotel Management">
                  Hotel Management
                </option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
              </select>

              <RiFilter3Line className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* HEADER */}
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
            {loading ? "Loading..." : `${syllabusData.length} syllabus found`}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <RiLoader4Line className="w-8 h-8 text-amber-500 animate-spin" />

            <p className="text-sm text-slate-500">
              Loading syllabus...
            </p>
          </div>
        ) : error ? (

          /* ERROR STATE */
          <div className="flex flex-col items-center justify-center py-12 bg-white border border-red-100 rounded-3xl gap-3">
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() => {
                // Changing the filter triggers another request.
                // For retry without changing filters, reload the page.
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800"
            >
              <RiRefreshLine className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : syllabusData.length === 0 ? (

          /* EMPTY STATE */
          <div className="text-center py-12 text-slate-400 text-sm bg-white border border-dashed border-slate-200 rounded-3xl">
            <RiFileTextLine className="w-10 h-10 mx-auto mb-3 text-slate-300" />

            <p className="font-semibold text-slate-600">
              No syllabus found
            </p>

            <p className="text-xs mt-1">
              No syllabus matches your selected filters.
            </p>
          </div>
        ) : (

          /* SYLLABUS CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {syllabusData.map((item) => (
              <div
                key={item._id}
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
                    <strong className="text-slate-700">
                      Subjects:{" "}
                    </strong>

                    {item.subjects || "N/A"}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400 text-xs min-w-0">
                    <RiFileTextLine className="w-4 h-4 shrink-0" />

                    <span className="truncate">
                      {item.pdfName || "PDF Document"}
                    </span>
                  </div>

                  {item.pdfUrl ? (
                    <a
                      href={getPdfUrl(item.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={item.pdfName || "syllabus.pdf"}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
                    >
                      <RiDownloadLine className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      PDF unavailable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
