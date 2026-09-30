import React from "react";
import StudentList from "./student/ManageStudent";

export default function Dashboard() {
  const stats = [
    { title: "Total Students", value: "1,248" },
    { title: "Total Teachers", value: "84" },
    { title: "Active Programs", value: "4" },
    { title: "Pending Admissions", value: "32" },
  ];

  const recentAdmissions = [
    {
      id: "ADM-2026-01",
      name: "Aarav Sharma",
      program: "Computer Engineering",
      grade: "Grade 11",
      status: "Approved",
    },
    {
      id: "ADM-2026-02",
      name: "Sita Gurung",
      program: "General Science",
      grade: "Grade 11",
      status: "Pending",
    },
    {
      id: "ADM-2026-03",
      name: "Rohan Shrestha",
      program: "Hotel Management",
      grade: "Grade 12",
      status: "Approved",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex font-sans">
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-xs text-slate-500">
              Quick view of key operational metrics.
            </p>
          </div>

          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
              >
                <p className="text-xs text-slate-500 font-medium">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-1">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Table View */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-3">
              Recent Admissions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="p-2.5">App ID</th>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Program</th>
                    <th className="p-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentAdmissions.map((row) => {
                    const isApproved = row.status === "Approved";
                    return (
                      <tr key={row.id}>
                        <td className="p-2.5 font-mono text-slate-400">
                          {row.id}
                        </td>
                        <td className="p-2.5 font-semibold text-slate-800">
                          {row.name}
                        </td>
                        <td className="p-2.5">{row.program}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                              isApproved
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}