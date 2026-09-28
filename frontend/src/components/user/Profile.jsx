import { useEffect, useState } from "react";
import {
  User,
  ShieldCheck,
  GraduationCap,
  UserRound,
  CheckCircle2,
  XCircle,
  Copy,
} from "lucide-react";
import Button from "../common/Button";
import { getMe } from "../../services/api";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {

  const {user}=useAuth()
  console.log(user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 
 

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />
          <p className="text-sm text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <XCircle className="mx-auto mb-3 h-10 w-10 text-red-500" />

          <h2 className="text-lg font-semibold text-red-700">
            Unable to load profile
          </h2>

          <p className="mt-1 text-sm text-red-600">{error}</p>

          <button
            onClick={loadUser}
            className="mt-5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-gray-500">No user information found.</p>
      </div>
    );
  }

  const isStudent = user.usertype?.toLowerCase() === "student";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/" className="flex justify-end">
        <Button body="Back" />
      </Link>
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-green-600">Account</p>

          <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View your account information and profile details.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500 sm:h-40" />

          {/* Profile Header */}
          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar + Name */}
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-green-100 shadow-md sm:h-28 sm:w-28">
                  <User className="h-12 w-12 text-green-700 sm:h-14 sm:w-14" />
                </div>

                <div className="pb-1">
                  <h2 className="text-2xl font-bold capitalize text-gray-900">
                    {user.username}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {isStudent ? "Student Account" : "Staff Account"}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                  user.isActive
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {user.isActive ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}

                {user.isActive ? "Active Account" : "Inactive Account"}
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Account Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <UserRound className="h-5 w-5 text-green-700" />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Account Information
                </h3>

                <p className="text-xs text-gray-500">Basic account details</p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoRow label="Username" value={user.username} />

              <InfoRow
                label="User Type"
                value={<span className="capitalize">{user.usertype}</span>}
              />

              <InfoRow
                label="Account Status"
                value={
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                      user.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                }
              />
            </div>
          </div>

          {/* Role Information */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                {isStudent ? (
                  <GraduationCap className="h-5 w-5 text-blue-700" />
                ) : (
                  <ShieldCheck className="h-5 w-5 text-blue-700" />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Profile Information
                </h3>

                <p className="text-xs text-gray-500">
                  Role and account references
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <InfoRow
                label="Account Type"
                value={<span className="capitalize">{user.usertype}</span>}
              />

              <InfoRow
                label="Student ID"
                value={
                  user.studentId ? (
                    <IdValue value={user.studentId} />
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )
                }
              />

              <InfoRow
                label="Staff ID"
                value={
                  user.staffId ? (
                    <IdValue value={user.staffId} />
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )
                }
              />
            </div>
          </div>
        </div>

        {/* Account ID */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Account ID</h3>

              <p className="mt-1 text-xs text-gray-500">
                Unique identifier for your account
              </p>
            </div>

            <IdValue value={user._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   Reusable Components
------------------------------ */

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
      <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </span>

      <div className="text-sm font-medium text-gray-800">{value}</div>
    </div>
  );
}

function IdValue({ value }) {
  async function copyId() {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Failed to copy ID:", error);
    }
  }

  return (
    <div className="flex max-w-full items-center gap-2">
      <code className="max-w-[220px] truncate rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-600 sm:max-w-[320px]">
        {value}
      </code>

      <button
        type="button"
        onClick={copyId}
        title="Copy ID"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
      >
        <Copy className="h-4 w-4" />
      </button>
    </div>
  );
}
