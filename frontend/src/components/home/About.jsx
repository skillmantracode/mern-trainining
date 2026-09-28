import React from "react";
import {
  RiBankLine,
  RiMapPinLine,
  RiAwardLine,
  RiShieldCheckLine,
  RiGroupLine,
  RiBookOpenLine,
  RiArrowRightLine,
} from "react-icons/ri";

export default function AboutSection() {
  const highlights = [
    {
      icon: <RiAwardLine className="w-5 h-5 text-amber-400" />,
      title: "Quality Accreditation",
      desc: "Fully government-recognized with high NEB academic standards.",
    },
    {
      icon: <RiShieldCheckLine className="w-5 h-5 text-amber-400" />,
      title: "Safe & Disciplined",
      desc: "Inclusive campus environment fostering mutual respect and values.",
    },
    {
      icon: <RiGroupLine className="w-5 h-5 text-amber-400" />,
      title: "Experienced Faculty",
      desc: "Dedicated teachers and mentors driving student success.",
    },
    {
      icon: <RiBookOpenLine className="w-5 h-5 text-amber-400" />,
      title: "Practical Learning",
      desc: "Hands-on tech, science, and hotel management practical labs.",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-900 text-slate-100 overflow-hidden" id="about">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Header Card with School Details & Institutional ID */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
            
            {/* School Title & Subtitle */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                <RiBankLine className="w-3.5 h-3.5" />
                <span>About Our Institution</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Shree Siddhababa Secondary School
              </h1>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                <RiMapPinLine className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Pokhara, Gandaki Province, Nepal</span>
              </p>
            </div>

            {/* School Registration / Institutional ID Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  School Code / ID
                </p>
                <p className="text-xs font-bold text-amber-400 font-mono">
                  SSSS-38012
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Affiliation
                </p>
                <p className="text-xs font-bold text-slate-200">
                  NEB / Govt. Accredited
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Est. Year
                </p>
                <p className="text-xs font-bold text-amber-300">
                  2046 BS
                </p>
              </div>
            </div>

          </div>

          {/* Quick Overview Text */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            Shree Siddhababa Secondary School is a premier educational institution committed to academic excellence, technological skill advancement, and value-based learning. Serving students from Class 1 through Class 12, we bridge traditional education with modern practical streams including Computer Engineering and Hotel Management.
          </p>
        </div>

        {/* Main Content Grid: Story & Image Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-700/80 bg-slate-950 group">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
              alt="Shree Siddhababa School Campus"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider">
                Campus Life
              </span>
              <h3 className="text-lg font-bold text-white">
                Nurturing Tomorrow's Leaders
              </h3>
            </div>
          </div>

          {/* Right Column: Mission & Core Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Empowering Minds, Shaping Futures
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Our vision is to cultivate an engaging learning environment where students excel academically, develop critical problem-solving capabilities, and grow into responsible global citizens.
              </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                    {item.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-100">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Callout */}
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all active:scale-95 shadow-lg shadow-amber-500/20">
                <span>Explore Academic Programs</span>
                <RiArrowRightLine className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}