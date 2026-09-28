import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import { getUser ,deleteUser} from "../../../services/api";
import toast from "react-hot-toast";

export default function TotalUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // Filter by Status/Role

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await getUser();
      setUsers(res.data?.user || res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter pipeline: Search by Name, Username, Email, or ID + Filter by Status (Role)
  const filteredUsers = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return users.filter((user) => {
      // 1. Search across ID, Name, Username, and Email
      const matchSearch =
        
        user.username?.toLowerCase().includes(searchTerm) ||
        user._id?.toLowerCase().includes(searchTerm);

      // 2. Filter by Status/Role (e.g., student, teacher, admin)
      const userRole = (user.role || user.status || "student").toLowerCase();
      const matchStatus =
        statusFilter === "all" || userRole === statusFilter.toLowerCase();

      return matchSearch && matchStatus;
    });
  }, [users, search, statusFilter]);

  // Handle user deletion with optimistic state update
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // Helper function to render styled status badges
  const renderStatusBadge = (role) => {
    const status = (role || "student").toLowerCase();

    switch (status) {
      case "teacher":
      case "staff":
        return (
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-200">
            Staff
          </span>
        );
      case "student":
        return (
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-200">
            Student
          </span>
        );
      case "admin":
        return (
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            Admin
          </span>
        );
      default:
        return (
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex justify-end items-center">
        <Link to="/admin/users/">
          <Button body="Back" />
        </Link>
      </div>

      {/* Header & Control Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Total Users</h1>
          <p className="text-sm text-slate-500">
            Manage system students, teachers, and admins
          </p>
        </div>

        {/* Search Input & Status Filter Dropdown */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search by Name, Username, Email, or ID */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Username"
            className="px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition w-full sm:w-72"
          />

          {/* Filter by Status/Role */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition bg-white"
          >
            <option value="all">Filter By Status (All)</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-2xl shadow-sm">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Username</th>
              <th className="p-3 text-center"> UserType</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-400">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="p-3 font-mono text-slate-400">{user._id}</td>
                 
                  <td className="p-3 text-slate-600">{user.username}</td>
                  
                  <td className="p-3 text-center">
                    {renderStatusBadge(user.usertype )}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/users/update/${user._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit User"
                      >
                        ✏️
                      </Link>
                      <Link
                        to={`/admin/users/${user._id}`}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="View User"
                      >
                        👁️
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(user._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-slate-400">
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}