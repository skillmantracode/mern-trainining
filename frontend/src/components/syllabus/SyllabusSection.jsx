import React, { useState } from "react";
import {
  RiGraduationCapLine,
  RiBookOpenLine,
  RiFilter3Line,
  RiDownloadLine,
  RiFileTextLine,
} from "react-icons/ri";

export default function SyllabusSection() {
  const [selectedGrade, setSelectedGrade] = useState("All Grades");
  const [selectedProgram, setSelectedProgram] = useState("All Programs");

  // Sample data covering Class 1 to Class 12
  const syllabusData = [
    { id: 1, title: "Primary English & Nepali Curriculum", grade: "Class 1", program: "General", subjects: "English, Nepali, Math, Science", pdfUrl: "#" },
    { id: 2, title: "Basic Science & Mathematics Framework", grade: "Class 2", program: "General", subjects: "Math, Science, Social Studies", pdfUrl: "#" },
    { id: 3, title: "Elementary Learning Syllabus", grade: "Class 3", program: "General", subjects: "English, Nepali, Math, Science", pdfUrl: "#" },
    { id: 4, title: "Mid-Primary Core Curriculum", grade: "Class 4", program: "General", subjects: "Math, Science, Social, Computer", pdfUrl: "#" },
    { id: 5, title: "Primary Graduation Syllabus", grade: "Class 5", program: "General", subjects: "English, Nepali, Math, Science", pdfUrl: "#" },
    { id: 6, title: "Lower Secondary General Studies", grade: "Class 6", program: "General", subjects: "Science, Math, English, Social", pdfUrl: "#" },
    { id: 7, title: "Secondary Foundation Course", grade: "Class 7", program: "General", subjects: "Science, Math, Computer, Social", pdfUrl: "#" },
    { id: 8, title: "Basic Level Examination Syllabus", grade: "Class 8", program: "General", subjects: "Core Subjects & Practical Labs", pdfUrl: "#" },
    { id: 9, title: "Secondary Education Framework", grade: "Class 9", program: "General", subjects: "Physics, Chem, Math, English", pdfUrl: "#" },
    { id: 10, title: "SEE Board Exam Preparation Syllabus", grade: "Class 10", program: "General", subjects: "Complete SEE Curriculum", pdfUrl: "#" },
    { id: 11, title: "Hotel Management Higher Secondary", grade: "Class 11", program: "Hotel Management", subjects: "Food Production, Front Office, Housekeeping", pdfUrl: "#" },
    { id: 12, title: "Computer Engineering Tech Syllabus", grade: "Class 11", program: "Computer Engineering", subjects: "C Programming, Networking, Web Dev", pdfUrl: "#" },
    { id: 13, title: "Advanced Hotel Operations & Culinary", grade: "Class 12", program: "Hotel Management", subjects: "F&B Service, Hospitality Accounting", pdfUrl: "#" },
    { id: 14, title: "Software & Systems Architecture", grade: "Class 12", program: "Computer Engineering", subjects: "DBMS, C++, Digital Logic", pdfUrl: "#" },
    { id: 15, title: "General Science Higher Secondary", grade: "Class 12", program: "General", subjects: "Physics, Chemistry, Biology, Math", pdfUrl: "#" },
  ];

  // Filtering Logic
  const filteredSyllabus = syllabusData.filter((item) => {
    const matchesGrade = selectedGrade === "All Grades" || item.grade === selectedGrade;
    const matchesProgram = selectedProgram === "All Programs" || item.program === selectedProgram;
    return matchesGrade && matchesProgram;
  });

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Filter Controls Row matching Image 1 */}
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
                <option value="All Grades">All Grades (Class 1 - 12)</option>
                {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
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
                <option value="Hotel Management">Hotel Management</option>
                <option value="Computer Engineering">Computer Engineering</option>
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
            {filteredSyllabus.length} syllabus found
          </div>
        </div>

        {/* Syllabus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredSyllabus.map((item) => (
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

      </div>
    </section>
  );
}