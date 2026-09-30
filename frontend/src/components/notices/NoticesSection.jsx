import React from "react";
import {
  RiCalendarLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiGraduationCapLine,
  RiSparklingLine, // Replaced RiPartyLine with RiSparklingLine
  RiGroupLine,
  RiUserAddLine,
  RiExternalLinkLine,
} from "react-icons/ri";

export default function NoticeSection() {
  const notices = [
    {
      id: 1,
      isHero: true,
      categoryNepali: "भर्ना",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      icon: <RiUserAddLine className="w-7 h-7 text-amber-600" />,
      iconBg: "bg-amber-100",
      title: "Class 11 Academic Admission Open for Session 2083/84",
      description:
        "Applications are officially open for Science, Management, Hotel Management, and Computer Engineering streams. Online forms and entrance exam schedules are available now.",
      date: "August 01, 2026",
      pdfUrl: "#",
    },
    {
      id: 2,
      isHero: false,
      categoryNepali: "परीक्षा",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      icon: <RiGraduationCapLine className="w-5 h-5 text-rose-600" />,
      iconBg: "bg-rose-100",
      title: "SEE Board Examination Result 2082 Published",
      description:
        "Congratulations to all students! Shree Siddhababa achieved a 98% pass rate. Marksheets and toppers list are available at the admin office.",
      date: "July 15, 2026",
      pdfUrl: "#",
    },
    {
      id: 3,
      isHero: false,
      categoryNepali: "बिदा",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: true,
      icon: <RiSparklingLine className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-100",
      title: "Dashain Vacation & Holiday Notice",
      description:
        "School will remain closed for the Dashain festival celebration. Regular academic classes will resume promptly as scheduled.",
      date: "October 10, 2026",
      pdfUrl: "#",
    },
    {
      id: 4,
      isHero: false,
      categoryNepali: "बैठक",
      categoryEnglish: "SCHOOL NOTICE",
      isImportant: false,
      icon: <RiGroupLine className="w-5 h-5 text-sky-600" />,
      iconBg: "bg-sky-100",
      title: "Parent-Teacher Meeting - Grade 11 & 12",
      description:
        "Mandatory PTM for Hotel Management and Computer Engineering streams to discuss first terminal exam reports.",
      date: "September 05, 2026",
      pdfUrl: "#",
    },
  ];

  const heroNotice = notices.find((n) => n.isHero);
  const gridNotices = notices.filter((n) => !n.isHero);

  return (
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
        {heroNotice && (
          <div className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 sm:p-8 shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className={`p-2.5 rounded-2xl ${heroNotice.iconBg} shrink-0`}>
                    {heroNotice.icon}
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
        )}

        {/* 2. GRID NOTICES (3 Cards) */}
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
                    <div className={`p-2 rounded-xl ${item.iconBg}`}>
                      {item.icon}
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
  );
}