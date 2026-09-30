import React from "react";
import {
  RiTimeLine,
  RiUserFollowLine, // Replaced RiUserCheckLine with valid export
  RiArrowRightLine,
  RiHotelLine,
  RiComputerLine,
  RiFlaskLine,
} from "react-icons/ri";

export default function ProgramsSection() {
  const programs = [
    {
      id: "hotel-management",
      title: "Hotel Management",
      grade: "Grade 11–12",
      badgeIcon: <RiHotelLine className="w-6 h-6 text-white" />,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      description:
        "Learn professional hospitality skills including food production, front office operations, housekeeping, and food & beverage service with state-of-the-art lab facilities.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.0 GPA",
      subjects: [
        "Food Production",
        "Front Office Operations",
        "Housekeeping Management",
        "Food & Beverage Service",
        "Hospitality Accounting",
      ],
      facilityTag: "Practical Lab Facilities Available",
    },
    {
      id: "computer-engineering",
      title: "Computer Engineering",
      grade: "Grade 11–12",
      badgeIcon: <RiComputerLine className="w-6 h-6 text-white" />,
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
      description:
        "Comprehensive technical education covering software development, computer networking, web technologies, and database management for future tech leaders.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.4 GPA (Math & Science required)",
      subjects: [
        "Programming C/C++",
        "Web Development",
        "Computer Networking",
        "Database Systems",
        "Digital Logic",
      ],
      facilityTag: "High-Tech Computer Labs Available",
    },
    {
      id: "general-science",
      title: "General Science",
      grade: "Grade 11–12",
      badgeIcon: <RiFlaskLine className="w-6 h-6 text-white" />,
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      description:
        "Rigorous academic program focusing on core scientific principles, practical experiments, and preparation for medical, engineering, and research degrees.",
      duration: "2 years (Grade 11-12)",
      eligibility: "SEE passed with minimum 2.8 GPA",
      subjects: [
        "Physics",
        "Chemistry",
        "Biology / Mathematics",
        "English",
        "Nepali",
      ],
      facilityTag: "Advanced Physics & Chem Labs",
    },
  ];

  return (
    <section className="py-16 bg-slate-100 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Programs
          </h2>
          <p className="text-sm text-slate-500">
            Explore our accredited higher secondary courses designed to prepare students for successful higher education and technical careers.
          </p>
        </div>

        {/* Programs List */}
        <div className="space-y-10">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col lg:flex-row transition-all duration-300 hover:shadow-xl"
            >
              {/* Left Image Banner Section */}
              <div className="relative lg:w-5/12 min-h-[280px] lg:min-h-[380px] bg-slate-900 overflow-hidden flex flex-col justify-between p-6">
                {/* Background Image with Overlay */}
                <img
                  src={program.image}
                  alt={program.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-65 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/30 to-transparent" />

                {/* Top Badge Icon */}
                <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                  {program.badgeIcon}
                </div>

                {/* Bottom Overlay Title & Grade */}
                <div className="relative z-10 space-y-1.5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-950/70 border border-slate-700/60 text-[10px] font-medium tracking-wide">
                    {program.grade}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    {program.title}
                  </h3>
                </div>
              </div>

              {/* Right Content Section */}
              <div className="lg:w-7/12 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-6">
                  {/* Program Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {program.description}
                  </p>

                  {/* Duration & Eligibility Grid Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Duration Box */}
                    <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                        <RiTimeLine className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Duration
                        </p>
                        <p className="text-xs font-semibold text-slate-800">
                          {program.duration}
                        </p>
                      </div>
                    </div>

                    {/* Eligibility Box */}
                    <div className="p-4 bg-slate-50/80 border border-slate-100 rounded-2xl flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                        <RiUserFollowLine className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Eligibility
                        </p>
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {program.eligibility}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Subjects Pills */}
                  <div className="space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Key Subjects
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/60 text-xs font-medium text-slate-700"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Green Lab Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{program.facilityTag}</span>
                  </div>
                </div>

                {/* Call To Action Button */}
                <div className="pt-2">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-95">
                    <span>View Full Details</span>
                    <RiArrowRightLine className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}