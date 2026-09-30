import React, { useEffect } from "react";
import { useState } from "react";
import { getChooseReason, getReasonHeading } from "../../services/api";
import {
  RiMedalLine,
  RiTeamLine,
  RiComputerLine,
  RiBook3Line,
  RiShieldCheckLine,
  RiGlobalLine,
} from "react-icons/ri";

export default function WhyChooseUs() {
  const [features, setFeatures] = useState([]);
  const [header, setHeader] = useState([]);

  const loadHeader = async () => {
    const data = await getReasonHeading();
    setHeader(data.reasonHeading[0]);
  };

  const loadFeature = async () => {
    const data = await getChooseReason();
    setFeatures(data.reason);
  };
  useEffect(() => {
    loadFeature();
    loadHeader();
  }, []);

  return (
    <section className="relative py-24 bg-slate-50 text-slate-800 overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/40 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-800 text-xs font-semibold tracking-wide uppercase">
            <span>{header?.tagBadgeText}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {header?.headingMainText}{" "}
            <span className="text-amber-600">{header?.headingHighlight}</span>
          </h2>

          {/* Gold Dot & Dividers */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="w-12 h-[1px] bg-slate-200" />
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="w-12 h-[1px] bg-slate-200" />
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
           {header?.description}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white border border-slate-200/80 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/50 hover:border-amber-300 flex flex-col justify-between"
            >
              <div>
                {/* Rounded Icon Box matching image design */}
                <div className="w-14 h-14 rounded-2xl bg-slate-100/80 border border-slate-200/60 flex items-center justify-center group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors duration-300">
                  {item.selectIcon}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-200">
                  {item.featureTitle}
                </h3>

                {/* Gold Dot Accent under title */}
                <div className="flex items-center gap-2 my-3">
                  <span className="w-6 h-[1px] bg-slate-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="w-6 h-[1px] bg-slate-200" />
                </div>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Decorative Footer */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-600 transition-colors">
                <span>0{index + 1}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
