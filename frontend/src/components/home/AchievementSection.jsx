
import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/ri";
import { getAchievements } from "../../services/api";

// Dynamic icon component
const DynamicIcon = ({ iconName, className }) => {
  const IconComponent = Icons[iconName] || Icons.RiQuestionLine;

  return <IconComponent className={className} />;
};

export default function AchievementsSection() {
  const [achievements, setAchievements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch achievements from database
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getAchievements();

        if (res?.success) {
          setAchievements(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <section className="py-20 flex justify-center">
        <p className="text-slate-500">Loading achievements...</p>
      </section>
    );
  }

  // Empty state
  if (!achievements) {
    return null;
  }

  return (
    <section className="relative py-20 bg-slate-100/70 text-slate-800 overflow-hidden border-y border-slate-200/60">

      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute bottom-0 right-10 w-[400px] h-[200px] bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">

          {achievements.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold tracking-widest uppercase">
              <span>{achievements.badge}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {achievements.title}
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 py-1">
            <span className="w-10 h-px bg-slate-300" />
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="w-10 h-px bg-slate-300" />
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {achievements.description}
          </p>

        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {achievements.stats?.map((item) => (
            <div
              key={item._id || item.id}
              className="group relative bg-slate-50/80 hover:bg-white border border-slate-200/90 hover:border-indigo-300 rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-300/40 flex flex-col items-center justify-center"
            >

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-indigo-100/70 border border-indigo-200/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">

                <DynamicIcon
                  iconName={item.iconName}
                  className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors"
                />

              </div>

              {/* Number */}
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
