import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  RiArrowLeftLine,
  RiBookOpenLine,
  RiCalendarLine,
  RiCheckLine,
  RiGraduationCapLine,
  RiLoader4Line,
  RiComputerLine,
  RiFlaskLine,
  RiHotelLine,
  RiInformationLine,
} from "react-icons/ri";

import { getProgramById } from "../../services/api";

const BACKEND_URL = "http://localhost:5000";

const iconMap = {
  computer: RiComputerLine,
  science: RiFlaskLine,
  hotel: RiHotelLine,
  education: RiGraduationCapLine,
};

export default function ProgramDetail() {
  // Get program ID from URL
  // Example: /programs/12345
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch selected program from backend
  useEffect(() => {
    let isMounted = true;

    const fetchProgram = async () => {
      try {
        setLoading(true);
        setError("");
        setProgram(null);

        const response = await getProgramById(id);

        if (!response.success || !response.program) {
          throw new Error("Program not found.");
        }

        if (isMounted) {
          setProgram(response.program);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load program details."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProgram();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3">
        <RiLoader4Line className="animate-spin text-3xl text-blue-700" />

        <p className="text-slate-600">
          Loading program details...
        </p>
      </div>
    );
  }

  // Error state
  if (error || !program) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <RiInformationLine className="mb-3 text-5xl text-amber-500" />

        <h2 className="text-2xl font-bold text-slate-900">
          Program Not Found
        </h2>

        <p className="mt-2 text-slate-500">
          {error || "The requested program may have been removed."}
        </p>

        <Link
          to="/programs"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
        >
          <RiArrowLeftLine />
          Back to Programs
        </Link>
      </div>
    );
  }

  // Select icon dynamically
  const ProgramIcon =
    iconMap[program.iconKey] || RiGraduationCapLine;

  // Get image URL directly from backend
  // Supports both local uploads and full URLs
  const imageUrl = program.image
    ? program.image.startsWith("http")
      ? program.image
      : `${BACKEND_URL}${program.image.startsWith("/") ? "" : "/"}${program.image}`
    : "";

  return (
    <main className="min-h-screen bg-slate-50">

      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-slate-950 text-white">

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 lg:py-24">

          {/* Hero Content */}
          <div>

            <Link
              to="/programs"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              <RiArrowLeftLine />
              All Academic Programs
            </Link>

            <span className="inline-flex rounded-full bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-300">
              {program.grade || "Academic Program"}
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              {program.title}
            </h1>

            <p className="mt-5 max-w-xl leading-8 text-slate-300">
              {program.description || "Explore this academic program."}
            </p>

            {/* Quick Information */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <RiCalendarLine className="text-xl text-amber-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Duration
                  </p>

                  <p className="font-semibold">
                    {program.duration || "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <RiGraduationCapLine className="text-xl text-amber-400" />

                <div>
                  <p className="text-xs text-slate-400">
                    Academic Level
                  </p>

                  <p className="font-semibold">
                    {program.grade || "Not specified"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Program Image */}
          <div className="relative">

            <div className="absolute -inset-3 rounded-3xl bg-amber-400/10 blur-2xl" />

            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={program.title}
                  className="h-72 w-full object-cover md:h-96"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <ProgramIcon className="text-8xl text-amber-400" />
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ================= PROGRAM DETAILS ================= */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">

            {/* Program Overview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <RiBookOpenLine className="text-2xl" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Program Overview
                </h2>

              </div>

              <p className="leading-8 text-slate-600">
                {program.description || "No overview is available yet."}
              </p>

            </div>

            {/* Subjects */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <RiGraduationCapLine className="text-2xl" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Subjects Offered
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Subjects included in this academic program
                  </p>
                </div>

              </div>

              {program.subjects?.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">

                  {program.subjects.map((subject, index) => (
                    <div
                      key={`${subject}-${index}`}
                      className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
                    >
                      <RiCheckLine className="shrink-0 text-xl text-emerald-600" />

                      <span className="font-medium text-slate-700">
                        {subject}
                      </span>
                    </div>
                  ))}

                </div>
              ) : (
                <p className="text-slate-500">
                  Subjects have not been added yet.
                </p>
              )}

            </div>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Program Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Program Information
              </h2>

              <div className="mt-6 space-y-5">

                <div>
                  <p className="text-sm text-slate-500">
                    Eligibility
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {program.eligibility || "Contact the school for details"}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {program.duration || "Not specified"}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500">
                    Facility
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {program.facilityTag || "Not specified"}
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5">
                  <p className="text-sm text-slate-500">
                    Academic Level
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {program.grade || "Not specified"}
                  </p>
                </div>

              </div>
            </div>

            {/* Contact CTA */}
            <div className="rounded-2xl bg-blue-950 p-7 text-white">

              <h3 className="text-xl font-bold">
                Interested in this program?
              </h3>

              <p className="mt-3 text-sm leading-6 text-blue-100">
                Contact our school to learn more about admission,
                eligibility, and enrollment.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Contact Us
              </Link>

            </div>

          </aside>

        </div>
      </section>

    </main>
  );
}