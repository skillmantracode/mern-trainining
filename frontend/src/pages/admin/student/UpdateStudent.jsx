import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../../services/api";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdatedStudent() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    grade: "",
    section: "",
    faculty: "",
    academicYear: "",

    fatherName: "",
    motherName: "",
    guardianName: "",
    guardianPhone: "",

    phone: "",
    address: "",
  });

  async function loadStudent(id) {
    try {
      const res = await getStudentById(id);


      const student = res.data.student;

      setFormData({
        name: student.name,
        dob: student.dob ,
        gender: student.gender,

        grade: student.grade,
        section: student.section,
        faculty: student.faculty,
        academicYear: student.academicYear,

        fatherName: student.fatherName,
        motherName: student.motherName,
        guardianName: student.guardianName,
        guardianPhone: student.guardianPhone,

        phone: student.phone,
        address: student.address ,
      });
    } catch (error) {
      console.error("Failed to load student:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudent(id);
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
     

      const res=await updateStudent(id,formData)
      toast.success("The student is updated successfully")
      

    
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  }

 

  return (
    <div className="min-h-screen bg-gray-50 p-6">
        <Link to="/admin/students" className="flex justify-end mb-4">
        <Button body="Back To Students" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl space-y-6 rounded-xl border border-gray-100 bg-white p-6 shadow-md"
      >
        {/* ================= PERSONAL INFORMATION ================= */}
        <section>
          <h2 className="mb-4 border-b pb-3 text-xl font-bold text-gray-800">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Aarav Sharma"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Date of Birth
              </label>

              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select gender
                </option>

                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* ================= ACADEMIC INFORMATION ================= */}
        <section>
          <h2 className="mb-4 border-b pb-3 text-xl font-bold text-gray-800">
            Academic Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Grade */}
            <div>
              <label
                htmlFor="grade"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Grade
              </label>

              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select grade
                </option>

                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                  <option key={item} value={item}>
                    Grade {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div>
              <label
                htmlFor="section"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Section
              </label>

              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select section
                </option>

                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
              </select>
            </div>

            {/* Faculty */}
            <div>
              <label
                htmlFor="faculty"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Faculty / Stream
              </label>

              <select
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Not Applicable</option>
                <option value="Science">Science</option>
                <option value="Management">Management</option>
                <option value="Humanities">Humanities</option>
                <option value="HM">HM (Hotel Management)</option>
                <option value="Computer Engineering">
                  Computer Engineering
                </option>
              </select>
            </div>

            {/* Academic Year */}
            <div>
              <label
                htmlFor="academicYear"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Academic Year
              </label>

              <input
                type="text"
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="e.g. 2026"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= PARENT / GUARDIAN ================= */}
        <section>
          <h2 className="mb-4 border-b pb-3 text-xl font-bold text-gray-800">
            Parent / Guardian Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Father */}
            <div>
              <label
                htmlFor="fatherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Father's Name
              </label>

              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Father's full name"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mother */}
            <div>
              <label
                htmlFor="motherName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Mother's Name
              </label>

              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Mother's full name"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Guardian */}
            <div>
              <label
                htmlFor="guardianName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Guardian Name
              </label>

              <input
                type="text"
                id="guardianName"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Guardian full name"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Guardian Phone */}
            <div>
              <label
                htmlFor="guardianPhone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Guardian Phone
              </label>

              <input
                type="tel"
                id="guardianPhone"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= CONTACT INFORMATION ================= */}
        <section>
          <h2 className="mb-4 border-b pb-3 text-xl font-bold text-gray-800">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Student Phone */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Student Phone
              </label>

              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="98XXXXXXXX"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Address
              </label>

              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter student's address"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-3 border-t pt-3">
          <button
            type="button"
            onClick={()=>{
              loadStudent(id)
            }}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Reset
          </button>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Update Student
          </button>
        </div>
      </form>
    </div>
  );
}