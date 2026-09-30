import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import { useState } from "react";
import { createStudent } from "../../../services/api";
import toast from "react-hot-toast";

export default function AddStudent() {
  // form data state
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

  //value change
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await createStudent(formData);
      toast.success("The student is add successfully");
    } catch (err) {
      toast.error(err.message);
    }
    // Later:
    // POST this data to your backend API

    reset();
  }

  function reset() {
    setFormData({
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
  }

  return (
    <>
      <Link to="/admin/students" className="flex justify-end mb-4">
        <Button body="Back To Students" />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 border border-gray-100"
      >
        {/* ================= PERSONAL INFORMATION ================= */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>

              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
            Academic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class */}
            <div>
              <label
                htmlFor="grade"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Grade
              </label>

              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Section
              </label>

              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Faculty / Stream
              </label>

              <select
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= PARENT / GUARDIAN ================= */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
            Parent / Guardian Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Father */}
            <div>
              <label
                htmlFor="fatherName"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mother */}
            <div>
              <label
                htmlFor="motherName"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Guardian */}
            <div>
              <label
                htmlFor="guardianName"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Guardian Phone */}
            <div>
              <label
                htmlFor="guardianPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= CONTACT INFORMATION ================= */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Student Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* ================= ACTIONS ================= */}
        <div className="pt-3 flex justify-end gap-3 border-t">
          <button
            type="button"
            onClick={reset}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition shadow-sm"
          >
            Save Student
          </button>
        </div>
      </form>
    </>
  );
}
