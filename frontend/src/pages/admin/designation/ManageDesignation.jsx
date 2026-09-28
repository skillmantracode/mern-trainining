import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getDesignation, deleteDesignation } from "../../../services/api";

const ManageDesignation = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch designations
  const fetchDesignations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDesignation();
      setDesignations(response?.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load designations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Delete designation
  const handleDelete = async (id) => {
    const designation = designations.find((item) => item._id === id);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${designation?.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(id);
      await deleteDesignation(id);
      setDesignations((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete designation");
    } finally {
      setDeleteLoading(null);
    }
  };

  // Helper to safely extract department title/name
  const getDepartmentTitle = (dept) => {
    if (typeof dept === "object" && dept !== null) {
      return dept.title || dept.name || "";
    }
    return "";
  };

  // Helper to safely extract department code
  const getDepartmentCode = (dept) => {
    if (typeof dept === "object" && dept !== null) {
      return dept.code || "";
    }
    return "";
  };

  // Search + Filter (Includes Department matching)
  const filteredDesignations = useMemo(() => {
    return designations.filter((designation) => {
      const searchValue = search.toLowerCase();

      const deptName = getDepartmentTitle(designation.department);
      const deptCode = getDepartmentCode(designation.department);

      const matchesSearch =
        designation.title?.toLowerCase().includes(searchValue) ||
        designation.code?.toLowerCase().includes(searchValue) ||
        designation.description?.toLowerCase().includes(searchValue) ||
        deptName.toLowerCase().includes(searchValue) ||
        deptCode.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && designation.status) ||
        (statusFilter === "inactive" && !designation.status);

      return matchesSearch && matchesStatus;
    });
  }, [designations, search, statusFilter]);

  // Statistics
  const totalDesignations = designations.length;
  const activeDesignations = designations.filter((item) => item.status).length;
  const inactiveDesignations = designations.filter(
    (item) => !item.status,
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Workforce Management
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Manage Designations
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Organize employee positions, titles, departments, and designation
              codes from one place.
            </p>
          </div>

          <Link
            to="/admin/designation/add-designation"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <span className="text-lg">+</span> Add Designation
          </Link>
        </div>

        {/* ================= STATISTICS ================= */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Designations
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {totalDesignations}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Registered positions
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                💼
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Designations
                </p>
                <p className="mt-2 text-3xl font-bold text-indigo-600">
                  {activeDesignations}
                </p>
                <p className="mt-1 text-xs text-gray-400">Currently in use</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <span className="h-3 w-3 rounded-full bg-indigo-500" />
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Inactive Designations
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-700">
                  {inactiveDesignations}
                </p>
                <p className="mt-1 text-xs text-gray-400">Currently disabled</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100">
                <span className="h-3 w-3 rounded-full bg-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          {/* Toolbar */}
          <div className="border-b border-gray-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Designation Directory
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredDesignations.length} of {totalDesignations}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Search */}
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    🔍
                  </span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search designation or dept..."
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 sm:w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-center justify-between gap-4">
                <span>{error}</span>
                <button
                  onClick={fetchDesignations}
                  className="font-semibold underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Loading / Empty / Data Table */}
          {loading ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
              <p className="mt-4 text-sm font-medium text-gray-500">
                Loading designations...
              </p>
            </div>
          ) : filteredDesignations.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                💼
              </div>
              <h3 className="mt-5 text-lg font-semibold text-gray-900">
                No designations found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                {search || statusFilter !== "all"
                  ? "Try changing your search or status filter."
                  : "You haven't created any designations yet."}
              </p>
              {!search && statusFilter === "all" && (
                <Link
                  to="/admin/designation/add-designation"
                  className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Create Designation
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Designation Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Code
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredDesignations.map((designation) => {
                    const deptTitle = getDepartmentTitle(designation.department);
                    const deptCode = getDepartmentCode(designation.department);

                    return (
                      <tr
                        key={designation._id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Designation Title */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-600">
                              {designation.title?.charAt(0).toUpperCase() || "D"}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {designation.title}
                              </p>
                              <p className="mt-0.5 text-xs text-gray-400">
                                Employee position
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Code */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-mono text-sm font-semibold text-gray-700">
                            {designation.code}
                          </span>
                        </td>

                        {/* Department Column */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-gray-800">
                              {deptTitle || "N/A"}
                            </span>
                            {deptCode && (
                              <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600">
                                {deptCode}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Description */}
                        <td className="max-w-xs px-6 py-5">
                          <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                            {designation.description || "—"}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="whitespace-nowrap px-6 py-5">
                          {designation.status ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="whitespace-nowrap px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/admin/designation/update/${designation._id}`}
                              className="rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(designation._id)}
                              disabled={deleteLoading === designation._id}
                              className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {deleteLoading === designation._id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageDesignation;