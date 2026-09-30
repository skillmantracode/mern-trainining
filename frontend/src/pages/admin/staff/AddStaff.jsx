import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postStaffs, getDesignation } from "../../../services/api";
import toast from "react-hot-toast";

export default function AddStaff() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]);
  const [loadingDesignations, setLoadingDesignations] = useState(true);

  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "",
    address: "",
    designation: "",
    joinDate: "",
    status: "active",
  });

  // Fetch designations on component mount
  useEffect(() => {
    async function fetchDesignations() {
      try {
        const res = await getDesignation();
        // Adjust array path depending on backend response shape (e.g., res.data or res.data.data)
        const data = res?.data?.data || res?.data || [];
        setDesignations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load designations:", error);
        toast.error("Failed to load designations list");
      } finally {
        setLoadingDesignations(false);
      }
    }

    fetchDesignations();
  }, []);

  // Handle input change
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await postStaffs(formData);

      if (res?.data?.success || res?.status === 200 || res?.status === 201) {
        toast.success("Staff added successfully");
        navigate("/admin/staffs");
      }
    } catch (error) {
      console.error("Failed to add staff:", error);
      toast.error(
        error.response?.data?.message || "Failed to add staff"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Add Staff
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Enter the staff member's information below.
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
              placeholder="e.g. Pokhara, Nepal"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Dynamic Designation Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Designation
            </label>

            <select
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              disabled={loadingDesignations}
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
            >
              <option value="">
                {loadingDesignations ? "Loading designations..." : "Select designation"}
              </option>
              {designations.map((item) => {
                // Adjust property names (item._id, item.title/name) depending on your MongoDB model
                const value = item._id || item.title || item.name;
                const label = item.title || item.name || item.designationName;

                return (
                  <option key={item._id || value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
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
            to="/admin/staffs"
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Adding..." : "Add Staff"}
          </button>

        </div>
      </form>
    </div>
  );
}