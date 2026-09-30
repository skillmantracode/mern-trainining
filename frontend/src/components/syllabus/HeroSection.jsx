import { RiBookOpenLine, RiDownloadLine } from "react-icons/ri";

export default function SyllabusHeroSection() {
  return (
    <section className="relative bg-[#0b1329] text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <RiBookOpenLine />
          <span>Curriculum & Courses</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          Academic Syllabus
        </h1>

        {/* Golden Divider */}
        <div className="flex items-center justify-center w-full max-w-xs mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mx-2 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1" />
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
          Explore complete subject outlines, grade-wise learning structures, and downloadable course materials designed for structured student growth.
        </p>
      </div>
    </section>
  );
}