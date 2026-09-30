import { RiNotification3Line, RiGraduationCapLine, RiCalendarEventLine, RiSparklingLine } from "react-icons/ri";

export default function NoticeHeroSection() {
  const stats = [
    { icon: <RiNotification3Line className="text-amber-400 text-2xl" />, count: "5", label: "Total Notices" },
    { icon: <RiGraduationCapLine className="text-amber-400 text-2xl" />, count: "2082", label: "Academic Session" },
    { icon: <RiCalendarEventLine className="text-amber-400 text-2xl" />, count: "3", label: "Important Updates" },
    { icon: <RiSparklingLine className="text-amber-400 text-2xl" />, count: "5", label: "Categories" },
  ];

  return (
    <section className="relative bg-[#0b1329] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blueprint Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />
      
      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <RiSparklingLine />
          <span>School Updates & Information</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Notices & Announcements
        </h1>

        {/* Golden Line Divider */}
        <div className="flex items-center justify-center w-full max-w-xs mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mx-2 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1" />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-10 font-normal">
          Find the latest school updates, examination routines, admission processes, holiday notices, and critical announcements published here.
        </p>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-5 flex flex-col items-center justify-center backdrop-blur-sm">
              <div className="mb-2">{item.icon}</div>
              <span className="text-2xl sm:text-3xl font-bold text-white mb-1">{item.count}</span>
              <span className="text-xs text-slate-400 font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}