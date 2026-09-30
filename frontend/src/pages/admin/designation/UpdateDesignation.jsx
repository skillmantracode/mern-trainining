import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getDesignation,
  updateDesignation,
} from "../../../services/api";

const UpdateDesignation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    status: true,
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getDesignation();

        const designations = response.data.data || [];

        const designation = designations.find(
          (item) => item._id === id
        );

        if (!designation) {
          setError("Designation not found");
          return;
        }

        setFormData({
          title: designation.title || "",
          code: designation.code || "",
          description: designation.description || "",
          status: designation.status ?? true,
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load designation"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDesignation();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      status: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await updateDesignation(id, {
        title: formData.title.trim(),
        code: formData.code.trim().toUpperCase(),
        description: formData.description.trim(),
        status: formData.status,
      });

      setSuccess("Designation updated successfully");

      setTimeout(() => {
        navigate("/admin/designation");
      }, 800);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update designation"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-200">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading designation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/designation"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            ← Back to Designations
          </Link>

          <p className="mt-6 text-sm font-medium text-emerald-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Update Designation
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the designation information below.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 md:p-8"
        >
          <div className="space-y-6">

            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Designation Name
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Software Engineer"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Designation Code
              </label>

              <input
                id="code"
                name="code"
                type="text"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. SSE"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm uppercase outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this designation..."
                rows={5}
                required
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Designation Status
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Enable or disable this designation.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={formData.status}
                  onChange={handleStatusChange}
                  className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-emerald-600 peer-checked:after:translate-x-full" />
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                to="/admin/designation"
                className="rounded-lg border border-gray-300 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Updating..."
                  : "Update Designation"}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDesignation;