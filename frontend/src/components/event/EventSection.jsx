import React, { useState } from "react";
import {
  RiFilterLine,
  RiHotelLine,
  RiComputerLine,
  RiBook3Line,
  RiGlobalLine,
} from "react-icons/ri";

export default function EventSection() {
  const [activeDepartment, setActiveDepartment] = useState("All");

  const departments = [
    { id: "All", label: "All" },
    { id: "Hotel Management", label: "Hotel Management" },
    { id: "Computer Engineering", label: "Computer Engineering" },
    { id: "Education", label: "Education" },
    { id: "General", label: "General" },
  ];

  const events = [
    {
      id: 1,
      title: "Hospitality & Culinary Workshop 2026",
      department: "Hotel Management",
      icon: <RiHotelLine className="w-10 h-10 text-white" />,
    },
    {
      id: 2,
      title: "National Tech Hackathon & Expo",
      department: "Computer Engineering",
      icon: <RiComputerLine className="w-10 h-10 text-white" />,
    },
    {
      id: 3,
      title: "Pedagogy & Teaching Excellence Seminar",
      department: "Education",
      icon: <RiBook3Line className="w-10 h-10 text-white" />,
    },
    {
      id: 4,
      title: "Annual Sports Day & Cultural Meet",
      department: "General",
      icon: <RiGlobalLine className="w-10 h-10 text-white" />,
    },
  ];

  const filteredEvents =
    activeDepartment === "All"
      ? events
      : events.filter((e) => e.department === activeDepartment);

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header Filter Bar (Matching Image 3) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <RiFilterLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Program Filter</h3>
              <p className="text-xs text-slate-500">Browse by department</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all outline-none ${
                  activeDepartment === dept.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                }`}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blueprint Style Cards Grid (Matching Image 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.map((item) => (
            <div
              key={item.id}
              className="relative h-64 rounded-3xl bg-slate-900 p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-slate-800 group"
            >
              {/* Subtle Grid Accent Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Department Badge */}
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                  {item.department}
                </span>
              </div>

              {/* Center Blueprint Icon */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white truncate">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}