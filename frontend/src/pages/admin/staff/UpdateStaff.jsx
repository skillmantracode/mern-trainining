import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getStaffsById, patchStaffs } from "../../../services/api";
import toast from "react-hot-toast";

export default function UpdateStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    address: "",
    designation: "",
    joinDate: "",
    status: "active",
  });

  // Load staff

  async function loadStaff(id) {
    try {
      const res = await getStaffsById(id);
      console.log(res.data.staff);
      
      const staff = res.data.staff;

      setFormData({
        fullname: staff.fullname,
        dob: staff.dob,
        gender: staff.gender,
        address: staff.address,
        designation: staff.designation,
        joinDate: staff.joinDate,
        status: staff.status,
      });
    } catch (error) {
      console.error("Failed to load staff:", error);
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadStaff(id);
  }, [id]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Update staff
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await patchStaffs(id, formData);

      if (res.data.success) {
        toast.success("Staff updated successfully");

        navigate(`/admin/staffs/update/${id}`);
      }
    } catch (error) {
      console.error("Failed to update staff:", error);

      toast.error(error.response?.data?.message || "Failed to update staff");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-500">Loading staff information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Update Staff</h2>

        <p className="text-sm text-slate-500 mt-1">
          Update the staff member's information below.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Designation
            </label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="e.g. Software Developer"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Join Date
            </label>

            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-slate-200">
          <Link
            to={`/admin/staffs/all-staff`}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {submitting ? "Updating..." : "Update Staff"}
          </button>
        </div>
      </form>
    </div>
  );
}
