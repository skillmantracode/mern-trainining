import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createDesignation, getDepartment } from "../../../services/api";
import Button from "../../../components/common/Button";

const INITIAL_FORM_STATE = {
  title: "",
  code: "",
  department: "", // Matches backend schema key
  description: "",
  status: true,
};

const AddDesignation = () => {
  const [departments, setDepartments] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    let isMounted = true;

    const fetchDepartments = async () => {
      try {
        setLoadingDepts(true);
        const response = await getDepartment();
        const deptList = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        if (isMounted) setDepartments(deptList);
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load departments:", error);
          setFeedback({
            type: "error",
            text: "Failed to load departments. Please refresh the page.",
          });
        }
      } finally {
        if (isMounted) setLoadingDepts(false);
      }
    };

    fetchDepartments();

    return () => {
      isMounted = false;
    };
  }, []);

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
      setFeedback(null);

      const response = await createDesignation(formData);

      setFeedback({
        type: "success",
        text: response.data?.message || "Designation created successfully!",
      });

      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setFeedback({
        type: "error",
        text: error.response?.data?.message || "Failed to create designation.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end p-4">
        <Link to="/admin/designation">
          <Button body="Back" />
        </Link>
      </div>

      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Add Designation
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new designation for your organization.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Designation Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
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
                  maxLength={10}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 uppercase outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use a unique code such as DEV, SSE, MGR, etc.
                </p>
              </div>

              {/* Department Dropdown */}
              <div>
                <label
                  htmlFor="department"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={loadingDepts}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
                  required
                >
                  <option value="" disabled>
                    {loadingDepts
                      ? "Loading departments..."
                      : "Select Department"}
                  </option>
                  {departments.map((dept) => {
                    const id = dept._id || dept.id;
                    return (
                      <option key={id} value={id}>
                        {dept.name || dept.title}
                      </option>
                    );
                  })}
                </select>
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
                  placeholder="Enter designation description..."
                  rows={5}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  required
                />
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Designation Status
                  </p>
                  <p className="text-xs text-gray-500">
                    Enable or disable this designation.
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
                  <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>

              {/* Feedback Alert Banner */}
              {feedback && (
                <div
                  className={`rounded-lg px-4 py-3 text-sm ${
                    feedback.type === "error"
                      ? "bg-red-50 text-red-700 border border-red-200"
                      : "bg-green-50 text-green-700 border border-green-200"
                  }`}
                >
                  {feedback.text}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || loadingDepts}
                className="w-full rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Designation"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDesignation;