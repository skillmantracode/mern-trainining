import { Link } from "react-router-dom";

import StatsCard from "../../../components/common/StatsCard";
import Button from "../../../components/common/Button";
import { getStudent } from "../../../services/api";
import { useEffect, useState } from "react";
export default function StudentList() {
  const [students, setStudents] = useState([]);
   const loadStudent = async () => {
      try {
        const res = await getStudent();
  
        setStudent(res.data.students);
        
      } catch (err) {
        console.log(err.message);
      }
    };
    useEffect(() => {
      loadStudent();
    }, []);
  const stats = [
    {
      title: "Total Student",
      count: students.length,
      note: "Enrolled & Active ",
    },
    {
      title: "New Admissions",
      count: "122",
      note: "tudents recently added/enrolled",
    },
    {
      title: "Faculty / Streams",
      count: "4",
      note: "CS,Science , HM,Mgmt ",
    },
    {
      title: "Gender Distribution ",
      count: "680/123",
      note: "Male / Female",
    },
  ];
  async function fetchStudent() {
    try {
      const res = await getStudent();
      setStudents(res.data.students);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <>
      {/* Title */}
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-3xl font-bold">Manage Student</h1>
        <h2>Add , Update , and Manage Student Record </h2>
      </div>
      <Link to="/admin/students/all-student" className="flex justify-end">
        <Button body="View All Students" />
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
          <table className="w-full text-left text-xs text-slate-600 ">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
              <tr>
                <th className="p-2.5">Student ID</th>
                <th className="p-2.5">Name</th>
                <th className="p-2.5">Class</th>
                <th className="p-2.5">Gender</th>
                <th className="p-2.5">Faculty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((row) => {
                return (
                  <tr key={row.id}>
                    <td className="p-2.5 font-mono text-slate-400">{row.id}</td>
                    <td className="p-2.5 font-semibold text-slate-800">
                      {row.name}
                    </td>
                    <td className="p-2.5">{row.class}</td>
                    <td className="p-2.5">{row.gender}</td>
                    <td className="p-2.5 font-semibold text-slate-800">
                      {row.faculty}
                    </td>
                    <td className="p-2.5 flex items-center gap-2">
                      {/* Edit */}
                      <button
                        type="button"
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Student"
                      >
                        ✏️
                      </button>
                      <Link
                        className="inline-flex items-center justify-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="View Student"
                      >
                        👁️
                      </Link>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(row.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Student"
                      >
                        🗑️
                      </button>
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
