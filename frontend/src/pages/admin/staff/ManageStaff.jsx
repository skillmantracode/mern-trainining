import { Link } from "react-router-dom";

import StatsCard from "../../../components/common/StatsCard";
import Button from "../../../components/common/Button";
import { useState,useEffect } from "react";
import { getStaffs } from "../../../services/api";

export default function ManageStaff() {
  const [staff,setStaff]=useState([])
  const loadStudent = async () => {
    try {
      const res = await getStaffs();

      setStaff(res.data.staff);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    loadStudent();
  }, []);

  const stats = [
    {
      title: "Total Students",
      count: staff.length,
      note: "Currently enrolled students",
    },
    {
      title: "New Admissions",
      count: "22",
      note: "Students recently enrolled",
    },
    {
      title: "Departments",
      count: "4",
      note: "Science, Management, HM, Humanities",
    },
    {
      title: "Role",
      count: "68 / 53",
      note: "Male / Female",
    },
  ];

  const Staffs = [
    {
      id: "Stu-11-1",
      name: "Aarav Sharma",
      department: "Science",
      gender: "Male",
    },
    {
      id: "Stu-12-2",
      name: "Sita Magar",
      department: "Hotel Management",
      gender: "Female",
    },
    {
      id: "Stu-10-3",
      name: "Bikash Thapa",
      department: "Management",
      gender: "Male",
    },
    {
      id: "Stu-12-4",
      name: "Pooja Shrestha",
      department: "Humanities",
      gender: "Female",
    },
    {
      id: "Stu-09-5",
      name: "Rohan Gurung",
      department: "Computer Engineering",
      gender: "Male",
    },
  ];
  return (
    <>
      {/* Title */}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold">Manage Student</h1>
        <h2>Add , Update , and Manage Staff Record </h2>
      </div>
      <Link to="/admin/staffs/all-staff" className="flex justify-end">
        <Button body="View All Staffs" />
      </Link>
      {/* body */}
      <div className="flex flex-col gap-8">
        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">
          {stats.map((value, index) => (
            <StatsCard
              title={value.title}
              count={value.count}
              note={value.note}
              link={value.link}
            />
          ))}
        </div>
        {/* table */}
        <div className="overflow-x-auto bg-white p-2 rounded-2xl shadow-xl">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-2.5">Staffs ID</th>
                <th className="p-2.5">Full Name</th>
                <th className="p-2.5">Gender</th>
                <th className="p-2.5">Department</th>
                <th className="p-2.5">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {Staffs.map((row) => {
                return (
                  <tr key={row.id}>
                    <td className="p-2.5 font-mono text-slate-400">{row.id}</td>

                    <td className="p-2.5 font-semibold text-slate-800">
                      {row.name}
                    </td>

                    <td className="p-2.5">{row.gender}</td>

                    <td className="p-2.5 font-semibold text-slate-800">
                      {row.department}
                    </td>

                    <td className="p-2.5">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button
                          type="button"
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Student"
                        >
                          ✏️
                        </button>

                        {/* View */}
                        <Link
                          to={`/students/${row.id}`}
                          className="inline-flex items-center justify-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          title="View Student"
                        >
                          👁️
                        </Link>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Student"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
