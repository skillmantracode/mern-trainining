import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import { getStudent } from "../../../services/api";
import { deleteStudent } from "../../../services/api";
import toast from "react-hot-toast";
// import students from "../../../sampleData/Student";
export default function TotalStudent() {
  const [students, setStudent] = useState([]);
  const [reload, setReload] = useState(false);
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
  }, [reload]);

  const [clas, setClass] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");

  const filterStudents = students.filter((student) => {
    const searchIDorName = search.toLowerCase().trim();

    const matchedSearch =
      student.name.toLowerCase().includes(searchIDorName) ||
      student.id.toLowerCase().includes(searchIDorName);

    const matchedClass =
      clas === "all" || String(student.class) === String(clas);

    const matchedFaculty =
      selectedFaculty === "all" ||
      String(student.faculty.toLowerCase()) === String(selectedFaculty);

    return matchedSearch && matchedClass && matchedFaculty;
  });

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?",
    );

    if (!confirmed) {
      return;
    }
    try {
      const res = await deleteStudent(id);
      toast.success("Student Deleted")
      setReload((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Link to="/admin/students" className="flex justify-end items-center">
        <Button body="Back" />
      </Link>

      {/* Head */}
      <div className="flex justify-between items-center mb-4">
        {/* left */}
        <div>
          <p className="text-3xl font-bold">Total Student By Class</p>
        </div>
        {/* right */}
        <div className="flex justify-around items-center gap-3">
          {/* Fixed: Connected to 'search' state */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By ID or Name"
            className="outline-none border-gray-500 border p-2 rounded-xl"
          />

          {/* Fixed: Connected to 'clas' state & fixed option values */}
          <select
            value={clas}
            onChange={(e) => setClass(e.target.value)}
            className="outline-none border p-2 rounded-xl border-gray-600"
          >
            <option value="all">Filter By Class</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
            <option value="11">Class 11</option>
            <option value="12">Class 12</option>
          </select>
          <select
            name=""
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="outline-none border-1 p-2  rounded-xl border-gray-600"
          >
            <option value="all">Filter By Faculty</option>
            {students.length > 0 &&
              students.map((student) => {
                return (
                  <option value={student.faculty?.toLowerCase()}>
                    {student.faculty}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      {/* body */}
      <div className="overflow-x-auto bg-white p-2 rounded-2xl shadow-xl">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
            <tr>
              <th className="p-2.5">Student ID</th>
              <th className="p-2.5">Name</th>
              <th className="p-2.5">Class</th>
              <th className="p-2.5">Gender</th>
              <th className="p-2.5">Faculty</th>
              <th className="p-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filterStudents.length > 0 ? (
              filterStudents.map((row) => (
                <tr key={row._id}>
                  <td className="p-2.5 font-mono text-slate-400">{row._id}</td>
                  <td className="p-2.5 font-semibold text-slate-800">
                    {row.name}
                  </td>
                  <td className="p-2.5">{row.grade}</td>
                  <td className="p-2.5">{row.gender}</td>
                  <td className="p-2.5 font-semibold text-slate-800">
                    {row.faculty}
                  </td>
                  <td className="p-2.5 flex items-center gap-2">
                    {/* Edit */}
                    <Link
                      to={`/admin/students/update/${row._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Edit Student"
                    >
                      ✏️
                    </Link>
                    <Link
                      to={`/admin/students/${row._id}`}
                      className="inline-flex items-center justify-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                      title="View Student"
                    >
                      👁️
                    </Link>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(row._id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Student"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-slate-400">
                  No students found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
