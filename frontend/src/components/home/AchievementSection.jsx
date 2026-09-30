import React from "react";
import {
  RiGroupLine,
  RiTrophyLine,
  RiCalendarEventLine,
  RiHeartPulseLine,
} from "react-icons/ri";

export default function AchievementsSection() {
  const stats = [
    {
      id: 1,
      icon: <RiGroupLine className="w-6 h-6 text-indigo-600" />,
      number: "1,500+",
      label: "Enrolled Students",
      subtext: "Across grades 1 to 12",
    },
    {
      id: 2,
      icon: <RiTrophyLine className="w-6 h-6 text-indigo-600" />,
      number: "98%",
      label: "Board Pass Rate",
      subtext: "Academic excellence",
    },
    {
      id: 3,
      icon: <RiCalendarEventLine className="w-6 h-6 text-indigo-600" />,
      number: "30+",
      label: "Years of Experience",
      subtext: "Quality school education",
    },
    {
      id: 4,
      icon: <RiHeartPulseLine className="w-6 h-6 text-indigo-600" />,
      number: "10,000+",
      label: "Alumni Network",
      subtext: "Graduates worldwide",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-100/70 text-slate-800 overflow-hidden border-y border-slate-200/60">
      {/* Subtle Cool Tint Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-widest uppercase">
            <span>Our Achievement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Milestones of Excellence
          </h2>

          {/* Accent Divider */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="w-10 h-[1px] bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="w-10 h-[1px] bg-slate-300" />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Building a successful future for students through quality education, discipline, and a holistic academic environment.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/40 flex flex-col items-center justify-center"
            >
              {/* Icon Bubble */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <span className="group-hover:text-white transition-colors">
                  {item.icon}
                </span>
              </div>

              {/* Counter Value */}
              <h3 className="mt-6 text-3xl font-black text-slate-900 tracking-tight">
                {item.number}
              </h3>

              {/* Label */}
              <p className="mt-1 text-sm font-bold text-slate-800">
                {item.label}
              </p>

              {/* Subtext */}
              <p className="mt-1 text-xs text-slate-500 font-medium">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}