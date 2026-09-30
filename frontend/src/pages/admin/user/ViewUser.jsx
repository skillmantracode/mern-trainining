import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import { getUserById } from "../../../services/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function TotalProfileUser({ user }) {
  // Mock fallback data if no user prop is provided directly during testing
  const [profile, setProfile] = useState("");
  const { id } = useParams();

  const loadUsers = async (id) => {
    try {
      const res = await getUserById(id);
      console.log(res.data?.user);
      setProfile(res.data?.user || res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
    }
  };

  useEffect(() => {
    loadUsers(id);
  }, []);

  // Status Badge Styling Helper
  const renderStatusBadge = (statusVal) => {
    const status = (statusVal || "student").toLowerCase();

    switch (status) {
      case "teacher":
      case "staff":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            • Teacher
          </span>
        );
      case "admin":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            • Admin
          </span>
        );
      case "student":
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            • Student
          </span>
        );
    }
  };

  // Dynamic Avatar Initials Fallback
  const getInitials = (name, username) => {
    const displayName = name || username || "U";
    return displayName.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">User Profile</h1>
        <Link to="/admin/users">
          <Button body="Back" />
        </Link>
      </div>

      {/* Main Profile Card Container */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-800" />

        {/* Profile Details Header */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-12 gap-4 mb-6">
            {/* Avatar Profile Picture */}
            <div className="relative">
              {profile.profilePic ? (
                <img
                  src = {`http://localhost:5000${profile.profilePic}`}
                  alt={profile?.username}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-800 text-white text-4xl font-bold flex items-center justify-center border-4 border-white shadow-md">
                  {getInitials(profile.name, profile.username)}
                </div>
              )}
            </div>
          </div>

          {/* User Primary Titles */}
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-900">
                {profile.name || profile.username}
              </h2>
              {renderStatusBadge(profile.status)}
            </div>
            <p className="text-sm font-medium text-slate-500">
              @{profile.username}
            </p>
          </div>

          {/* Information Grid */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              Account Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  User ID
                </span>
                <span className="text-xs font-mono font-semibold text-slate-700 select-all">
                  {profile._id}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  Username
                </span>
                <span className="text-sm font-semibold text-slate-800">
                  {profile.username}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-xs font-medium text-slate-400 block mb-1">
                  System Role / Status
                </span>
                <span className="text-sm font-semibold text-slate-800 capitalize">
                  {profile.status || "student"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
