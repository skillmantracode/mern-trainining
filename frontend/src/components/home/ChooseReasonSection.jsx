
import React, { useEffect, useState } from "react";
import { getChooseReason, getReasonHeading } from "../../services/api";

import {
  RiMedalLine,
  RiTeamLine,
  RiComputerLine,
  RiBook3Line,
  RiShieldCheckLine,
  RiGlobalLine,
} from "react-icons/ri";

// Backend icon identifier -> React icon component
const ICON_MAP = {
  medal: RiMedalLine,
  team: RiTeamLine,
  computer: RiComputerLine,
  book: RiBook3Line,
  shield: RiShieldCheckLine,
  global: RiGlobalLine,
};

export default function WhyChooseUs() {
  const [features, setFeatures] = useState([]);
  const [header, setHeader] = useState(null);

  // Fetch Section Heading and Features
  useEffect(() => {
    const loadData = async () => {
      try {
        const [headingData, featureData] = await Promise.all([
          getReasonHeading(),
          getChooseReason(),
        ]);

        setHeader(headingData?.reasonHeading?.[0] || null);
        setFeatures(featureData?.reason || []);
      } catch (error) {
        console.error("Failed to load Why Choose Us section:", error);
      }
    };

    loadData();
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 text-slate-800">

      {/* Background Accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[800px] -translate-x-1/2 rounded-full bg-amber-100/40 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
            {header?.tagBadgeText}
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {header?.headingMainText}{" "}
            <span className="text-amber-600">
              {header?.headingHighlight}
            </span>
          </h2>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="h-px w-12 bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span className="h-px w-12 bg-slate-200" />
          </div>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            {header?.description}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((item, index) => {

            // Find the icon using the backend identifier
            const Icon = ICON_MAP[item.selectIcon] || RiMedalLine;

            return (
              <div
                key={item._id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div>

                  {/* Dynamic Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-100/80 transition-colors duration-300 group-hover:border-amber-200 group-hover:bg-amber-50">
                    <Icon
                      size={30}
                      className="text-slate-700 transition-colors duration-300 group-hover:text-amber-600"
                    />
                  </div>

                  {/* Feature Title */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-amber-600">
                    {item.featureTitle}
                  </h3>

                  {/* Decorative Divider */}
                  <div className="my-3 flex items-center gap-2">
                    <span className="h-px w-6 bg-slate-200" />
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span className="h-px w-6 bg-slate-200" />
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Decorative Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400 transition-colors group-hover:text-amber-600">
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    Learn more →
                  </span>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
