import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getDepartment,
  deleteDepartment,
} from "../../../services/api";

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDepartment();

      setDepartments(response?.data?.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load departments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Delete department
  const handleDelete = async (id) => {
    const department = departments.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${department?.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);

      await deleteDepartment(id);

      setDepartments((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete department"
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // Search + filter
  const filteredDepartments = useMemo(() => {
    return departments.filter((department) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        department.title
          ?.toLowerCase()
          .includes(searchValue) ||
        department.code
          ?.toLowerCase()
          .includes(searchValue) ||
        department.description
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && department.status) ||
        (statusFilter === "inactive" && !department.status);

      return matchesSearch && matchesStatus;
    });
  }, [departments, search, statusFilter]);

  // Statistics
  const totalDepartments = departments.length;

  const activeDepartments = departments.filter(
    (department) => department.status
  ).length;

  const inactiveDepartments = departments.filter(
    (department) => !department.status
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="mb-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Administration
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Manage Departments
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create, update, and manage the departments
              available across your organization.
            </p>
          </div>

          <Link
            to="/admin/department/add-department"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <span className="text-lg">+</span>
            Add Department
          </Link>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Departments
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalDepartments}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  All registered departments
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                🏢
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-600">
                  {activeDepartments}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Currently available
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inactive
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-700">
                  {inactiveDepartments}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Currently disabled
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                <span className="h-3 w-3 rounded-full bg-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

          {/* Toolbar */}
          <div className="border-b border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Department Directory
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {filteredDepartments.length} department
                  {filteredDepartments.length !== 1 ? "s" : ""} shown
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search departments..."
                    className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-64"
                  />
                </div>

                {/* Status */}
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value)
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-center justify-between gap-4">
                <span>{error}</span>

                <button
                  onClick={fetchDepartments}
                  className="font-semibold underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

              <p className="mt-4 text-sm font-medium text-slate-500">
                Loading departments...
              </p>
            </div>
          ) : filteredDepartments.length === 0 ? (
            /* Empty */
            <div className="px-6 py-20 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                🏢
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                No departments found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                {search || statusFilter !== "all"
                  ? "Try changing your search or filter."
                  : "You haven't created any departments yet."}
              </p>

              {!search && statusFilter === "all" && (
                <Link
                  to="/admin/department/add-department"
                  className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Create Department
                </Link>
              )}
            </div>
          ) : (
            /* Table */
            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Department
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Code
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Description
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredDepartments.map((department) => (
                    <tr
                      key={department._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Department */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-base font-bold text-emerald-600">
                            {department.title
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {department.title}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              Department
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Code */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm font-semibold text-slate-700">
                          {department.code}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="max-w-sm px-6 py-5">
                        <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                          {department.description}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-6 py-5">
                        {department.status ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-6 py-5">
                        <div className="flex justify-end gap-2">

                          <Link
                            to={`/admin/department/update/${department._id}`}
                            title="Edit department"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-50"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(department._id)
                            }
                            disabled={
                              deleteLoading === department._id
                            }
                            title="Delete department"
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deleteLoading === department._id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ManageDepartment;