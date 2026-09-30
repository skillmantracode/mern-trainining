import { useState } from "react";
import axios from "axios";
import { createDepartment } from "../../../services/api";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";


const AddDepartment = () => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    status: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await createDepartment(formData)

      setMessage(response.data.message);

      setFormData({
        title: "",
        code: "",
        description: "",
        status: true,
      });
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to create department"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <Link to="/admin/department" className="flex justify-end">
        <Button body="Back"/>
      </Link>
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-xl bg-white p-8 shadow-md">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Add Department
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create a new department for your organization.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Computer Science"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Code */}
            <div>
              <label
                htmlFor="code"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Department Code
              </label>

              <input
                id="code"
                name="code"
                type="text"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g. CS"
                maxLength={10}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />

              <p className="mt-1 text-xs text-gray-500">
                Use a unique code such as CS, IT, BCA, etc.
              </p>
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
                placeholder="Enter department description..."
                rows={5}
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Status */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Department Status
                </p>

                <p className="text-xs text-gray-500">
                  Enable or disable this department.
                </p>
              </div>

              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>

            {/* Message */}
            {message && (
              <div className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-700">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Department"}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddDepartment;