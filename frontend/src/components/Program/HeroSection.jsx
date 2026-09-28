export default function HeroSection() {
  return (
    <section className="relative bg-[#0b1329] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop')`,
        }}
      ></div>

      {/* Radial Blue Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-5 shadow-inner">
          <span>Academic Programs</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl mb-4">
          Four Stages, One Continuous <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300">
            Standard of Excellence
          </span>
        </h1>

        {/* Golden Divider Line */}
        <div className="flex items-center justify-center w-full max-w-xs mb-4">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1"></div>
          <div className="w-2 h-2 rounded-full bg-amber-400 mx-2 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent flex-1"></div>
        </div>

        {/* Description Paragraph */}
        <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-normal">
          Empowering students through practical learning, innovation, discipline, and quality education — designed so a student never outgrows the support around them.
        </p>

        {/* Quick Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-6">
          <a href="#primary" className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-amber-400/60 hover:text-white transition-all">
            Primary (1–5)
          </a>
          <a href="#lower-secondary" className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-amber-400/60 hover:text-white transition-all">
            Lower Secondary (6–8)
          </a>
          <a href="#secondary" className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-amber-400/60 hover:text-white transition-all">
            Secondary (9–10)
          </a>
          <a href="#higher-secondary" className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700 hover:border-amber-400/60 hover:text-white transition-all">
            Higher Secondary (11–12)
          </a>
        </div>

      </div>
    </section>
  );
}