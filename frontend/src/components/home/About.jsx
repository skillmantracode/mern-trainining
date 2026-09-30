import React, { useEffect, useState } from "react";
import {
  RiBankLine,
  RiMapPinLine,
  RiAwardLine,
  RiShieldCheckLine,
  RiGroupLine,
  RiBookOpenLine,
  RiArrowRightLine,
} from "react-icons/ri";
import {
  getUpperAbout,
  getMiddleAbout,
  getLowAboutPart,
} from "../../features/Landing/api"; // Adjust import path as needed

// Base URL for backend uploaded images (adjust process.env variable if available)
const BASE_URL = import.meta.env?.VITE_API_BASE_URL || "http://localhost:5000";

export default function AboutSection() {
  const [upperData, setUpperData] = useState(null);
  const [middleData, setMiddleData] = useState(null);
  const [lowerData, setLowerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllAboutData = async () => {
      try {
        setLoading(true);

        const [upperRes, middleRes, lowerRes] = await Promise.all([
          getUpperAbout(),
          getMiddleAbout(),
          getLowAboutPart(),
        ]);

        // Support both direct data structures and standard nested response structure (e.g. res.upperAbout)
        const upper = upperRes?.upperAbout || upperRes?.data?.upperAbout || upperRes;
        const middle = middleRes?.upperAbout || middleRes?.middleAbout || middleRes?.data?.middleAbout || middleRes;
        const lowerRaw = lowerRes?.card || lowerRes?.data?.card || lowerRes;
        
        // Lower controller returns { card: [...] } or array inside document
        const lowerList = Array.isArray(lowerRaw) 
          ? lowerRaw 
          : Array.isArray(lowerRaw?.card) 
          ? lowerRaw.card 
          : [];

        setUpperData(upper);
        setMiddleData(middle);
        setLowerData(lowerList);
      } catch (err) {
        setError("Failed to load about section content.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllAboutData();
  }, []);

  // Preset fallback icons for dynamic lower/cards section
  const fallbackIcons = [
    <RiAwardLine className="w-5 h-5 text-amber-400" />,
    <RiShieldCheckLine className="w-5 h-5 text-amber-400" />,
    <RiGroupLine className="w-5 h-5 text-amber-400" />,
    <RiBookOpenLine className="w-5 h-5 text-amber-400" />,
  ];

  // Helper to format image paths returned by Multer / Express controller
  const getImageSrc = (imagePath) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80";
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${BASE_URL}${cleanPath}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-900 text-slate-100 text-center">
        <p className="text-sm text-slate-400 animate-pulse">Loading institution info...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-slate-900 text-slate-100 text-center">
        <p className="text-sm text-rose-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="relative py-20 bg-slate-900 text-slate-100 overflow-hidden" id="about">
      {/* Background Radial Glow Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* UPPER PART: School Details & Institutional ID */}
        <div className="bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/80 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
            
            {/* School Title & Subtitle */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
                <RiBankLine className="w-3.5 h-3.5" />
                <span>{upperData?.badgeText || "About Our Institution"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {upperData?.schoolName || "Shree Siddhababa Secondary School"}
              </h1>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                <RiMapPinLine className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{upperData?.location || "Pokhara, Gandaki Province, Nepal"}</span>
              </p>
            </div>

            {/* School Registration / Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  School Code / ID
                </p>
                <p className="text-xs font-bold text-amber-400 font-mono">
                  {upperData?.schoolCode || "SSSS-38012"}
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Affiliation
                </p>
                <p className="text-xs font-bold text-slate-200">
                  {upperData?.affiliation || "NEB / Govt. Accredited"}
                </p>
              </div>

              <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Est. Year
                </p>
                <p className="text-xs font-bold text-amber-300">
                  {upperData?.estYear || "2046 BS"}
                </p>
              </div>
            </div>

          </div>

          {/* Upper Overview Description */}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            {upperData?.overviewText ||
              "Shree Siddhababa Secondary School is a premier educational institution committed to academic excellence, technological skill advancement, and value-based learning. Serving students from Class 1 through Class 12, we bridge traditional education with modern practical streams including Computer Engineering and Hotel Management."}
          </p>
        </div>

        {/* MIDDLE & LOWER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* MIDDLE PART: Image & Banner Content */}
          <div className="lg:col-span-5 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-xl border border-slate-700/80 bg-slate-950 group">
            <img
              src={getImageSrc(middleData?.campusBanner)}
              alt={middleData?.imageCardTitle || "Campus Banner"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider">
                {middleData?.imageTagLine || "Campus Life"}
              </span>
              <h3 className="text-lg font-bold text-white">
                {middleData?.imageCardTitle || "Nurturing Tomorrow's Leaders"}
              </h3>
            </div>
          </div>

          {/* LOWER PART: Vision & Dynamic Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {middleData?.visionHeading || "Empowering Minds, Shaping Futures"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {middleData?.visionSubHeading ||
                  "Our vision is to cultivate an engaging learning environment where students excel academically, develop critical problem-solving capabilities, and grow into responsible global citizens."}
              </p>
            </div>

            {/* Feature Cards dynamically populated from lower part `card` array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {lowerData.length > 0 ? (
                lowerData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                      {fallbackIcons[idx % fallbackIcons.length]}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-100">
                        {typeof item === "string" ? `Highlight ${idx + 1}` : item?.title || item?.heading || "Key Feature"}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        {typeof item === "string" ? item : item?.description || item?.desc || item?.subHeading}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                /* Fallback cards if lower card database is empty */
                [
                  { title: "Quality Accreditation", desc: "Fully government-recognized with high NEB academic standards." },
                  { title: "Safe & Disciplined", desc: "Inclusive campus environment fostering mutual respect and values." },
                  { title: "Experienced Faculty", desc: "Dedicated teachers and mentors driving student success." },
                  { title: "Practical Learning", desc: "Hands-on tech, science, and hotel management practical labs." },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 flex items-start gap-3 hover:border-amber-500/50 transition-colors"
                  >
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                      {fallbackIcons[idx]}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))
              )}
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