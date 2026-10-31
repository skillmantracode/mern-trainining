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
} from "react-icons/ri";

import { getNotices } from "../../services/api";
const API_URL = "http://localhost:5000";

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

const getPdfUrl = (pdfName) => {
  if (!pdfName) return null;

  return `${API_URL}/uploads/notices/${encodeURIComponent(pdfName)}`;
};

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

export default function NoticeSection() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH NOTICES
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getNotices();

        if (res?.success) {
          setNotices(res.notices || []);
        } else {
          setError(res?.message || "Unable to load notices");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load notices"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const heroNotice = notices.find((notice) => notice.isHero);

  const gridNotices = notices.filter((notice) => !notice.isHero);

  // LOADING STATE
  if (loading) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            Loading notices...
          </p>
        </div>
      </section>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* SECTION TITLE */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Notice Board & Announcements
          </h2>

          <p className="text-xs sm:text-sm text-slate-500">
            Stay updated with official academic notices, exam schedules,
            and events from Shree Siddhababa Secondary School.
          </p>
        </div>

        {/* EMPTY STATE */}
        {notices.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-10 text-center">
            <h3 className="text-lg font-bold text-slate-800">
              No Notices Available
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              There are currently no announcements. Please check again later.
            </p>
          </div>
        ) : (
          <>
            {/* FEATURED NOTICE */}
            {heroNotice && (
              <div className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 sm:p-8 shadow-lg shadow-slate-200/60 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                  <div className="space-y-4 flex-1">

                    {/* BADGES */}
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

                    {/* TITLE */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      {heroNotice.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {heroNotice.description}
                    </p>

                    {/* DATE */}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 pt-2">
                      <RiCalendarLine className="w-4 h-4 text-slate-400" />

                      <span>
                        Published on {formatNoticeDate(heroNotice.date)}
                      </span>
                    </div>
                  </div>

                  {/* PDF BUTTON */}
                  {heroNotice.pdfName && (
                    <div className="shrink-0 flex items-center md:flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-8 gap-3">
                      <a
                        href={getPdfUrl(heroNotice.pdfName)}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all active:scale-95 shadow-md"
                      >
                        <RiDownloadLine className="w-4 h-4" />

                        <span>Download PDF</span>

                        <RiExternalLinkLine className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OTHER NOTICES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gridNotices.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-white rounded-3xl border border-slate-200/80 border-t-4 border-t-amber-500 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-4">

                    {/* CARD HEADER */}
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

                    {/* TITLE */}
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                      {item.title}
                    </h4>

                    {/* DESCRIPTION */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* CARD FOOTER */}
                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">

                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                      <RiCalendarLine className="w-3.5 h-3.5 text-slate-400" />

                      <span>{formatNoticeDate(item.date)}</span>
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

                          <span>Download PDF</span>

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
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}