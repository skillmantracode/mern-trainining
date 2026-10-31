
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  RiTimeLine,
  RiUserFollowLine,
  RiArrowRightLine,
  RiHotelLine,
  RiComputerLine,
  RiFlaskLine,
  RiBook3Line,
  RiLoader4Line,
} from "react-icons/ri";

import { getPrograms } from "../../services/api";

// Your Express backend URL
const BACKEND_URL = "http://localhost:5000";

// Convert the backend image path into a complete URL
const getProgramImage = (image) => {
  if (!image) return "";

  // If backend already returns a full URL
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // If backend returns /uploads/image.jpg
  return `${BACKEND_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const iconMap = {
  hotel: RiHotelLine,
  computer: RiComputerLine,
  flask: RiFlaskLine,
  book: RiBook3Line,
};

export default function ProgramsSection() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPrograms = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPrograms();

        if (isMounted && response.success) {
          setPrograms(response.programs || []);
        }
      } catch (err) {
        console.error("Failed to fetch programs:", err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load academic programs."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPrograms();

    return () => {
      isMounted = false;
    };
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="py-20 bg-slate-100 text-center">
        <RiLoader4Line className="w-10 h-10 text-slate-700 mx-auto animate-spin" />

        <p className="mt-4 text-sm text-slate-500">
          Loading academic programs...
        </p>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-20 bg-slate-100 text-center">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-slate-100 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Programs
          </h2>

          <p className="text-sm text-slate-500">
            Explore our accredited higher secondary courses designed
            to prepare students for successful higher education and
            technical careers.
          </p>
        </div>

        {/* Empty State */}
        {programs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 py-16 text-center">
            <RiBook3Line className="w-10 h-10 mx-auto text-slate-300" />

            <h3 className="mt-3 font-bold text-slate-700">
              No Programs Available
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              Academic programs will be displayed here soon.
            </p>
          </div>
        ) : (
          <div className="space-y-10">

            {programs.map((program) => {
              const Icon = iconMap[program.iconKey] || RiBook3Line;

              // Get image directly from backend
              const imageUrl = getProgramImage(program.image);

              return (
                <div
                  key={program._id}
                  className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image Banner */}
                  <div className="relative lg:w-5/12 min-h-[280px] lg:min-h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={program.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-65 hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="w-24 h-24 text-white/30" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                    {/* Program Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Program Title */}
                    <div className="relative z-10 space-y-1.5 text-white">
                      <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-700/60 text-[10px] font-medium tracking-wide">
                        {program.grade || "Academic Program"}
                      </span>

                      <h3 className="text-2xl font-bold tracking-tight">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">

                    <div className="space-y-6">

                      {/* Description */}
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {program.description}
                      </p>

                      {/* Duration and Eligibility */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0">
                            <RiTimeLine className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Duration
                            </p>

                            <p className="text-xs font-semibold text-slate-800">
                              {program.duration || "Not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0">
                            <RiUserFollowLine className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Eligibility
                            </p>

                            <p className="text-xs font-semibold text-slate-800">
                              {program.eligibility || "Not specified"}
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Subjects */}
                      <div className="space-y-2.5">

                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Key Subjects
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {(program.subjects || []).map((subject, index) => (
                            <span
                              key={`${subject}-${index}`}
                              className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/60 text-xs font-medium text-slate-700"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Facility */}
                      {program.facilityTag && (
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {program.facilityTag}
                        </div>
                      )}

                    </div>

                    {/* CTA */}
                    <div className="pt-2">

                      <Link
                        to={`/programs/${program._id}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
                      >
                        <span>View Full Details</span>
                        <RiArrowRightLine className="w-4 h-4" />
                      </Link>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}
