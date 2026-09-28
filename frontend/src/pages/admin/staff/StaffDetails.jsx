import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStaffsById } from "../../../services/api";
import toast from "react-hot-toast";

export default function StaffDetails() {
  const { id } = useParams();

  const [staff, setStaff] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStaff() {
      try {
        const res = await getStaffsById(id);

        setStaff(res.data.staff);
      } catch (error) {
        console.error("Failed to load staff:", error);
        toast.error(
          error.response?.data?.message || "Failed to load staff"
        );
      } finally {
        setLoading(false);
      }
    }

    loadStaff();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-500">
          Loading staff information...
        </p>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">
          Staff member not found.
        </p>

        <Link
          to="/admin/staffs"
          className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl"
        >
          Back to Staff
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Staff Details
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            View detailed information about this staff member.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/staffs"
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            Back
          </Link>

          <Link
            to={`/admin/staffs/update/${staff._id}`}
            className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Edit Staff
          </Link>
        </div>
      </div>

      {/* Staff Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 border-b border-slate-200 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">
              {staff.fullname?.charAt(0).toUpperCase()}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {staff.fullname}
            </h2>

            <p className="text-sm text-slate-500">
              {staff.designation}
            </p>
          </div>

          <div className="ml-auto">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                staff.status === "active"
                  ? "bg-emerald-100 text-emerald-700"
                  : staff.status === "inactive"
                  ? "bg-slate-100 text-slate-600"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {staff.status}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.fullname}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Date of Birth
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.dob
                  ? new Date(staff.dob).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* Gender */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Gender
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.gender}
              </p>
            </div>

            {/* Designation */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Designation
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.designation}
              </p>
            </div>

            {/* Join Date */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Join Date
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.joinDate
                  ? new Date(staff.joinDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* Status */}
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Status
              </p>

              <p className="mt-1 font-semibold capitalize text-slate-800">
                {staff.status}
              </p>
            </div>

            {/* Address */}
            <div className="p-4 bg-slate-50 rounded-xl md:col-span-2">
              <p className="text-xs font-semibold uppercase text-slate-400">
                Address
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {staff.address}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-xs text-slate-400">
            Staff ID:{" "}
            <span className="font-mono text-slate-500">
              {staff._id}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}