
import React, { useEffect, useState } from "react";
import AchievementsSection from "../../../components/home/AchievementSection";
import {
  getAchievements,
  updateAchievements,
} from "../../../services/api";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiLoader4Line,
} from "react-icons/ri";

const AVAILABLE_ICONS = [
  { label: "Group / Students", value: "RiGroupLine" },
  { label: "Trophy / Award", value: "RiTrophyLine" },
  { label: "Calendar / Experience", value: "RiCalendarEventLine" },
  { label: "Pulse / Network", value: "RiHeartPulseLine" },
  { label: "Book / Learning", value: "RiBookOpenLine" },
  { label: "User / Teacher", value: "RiUserStarLine" },
  { label: "Building / Campus", value: "RiBuildingLine" },
  { label: "Medal / Excellence", value: "RiMedalLine" },
];

export default function AdminAchievementsSection() {
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    stats: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  // GET achievements from database
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await getAchievements();

        if (res?.success) {
          setFormData(res.data);
        }
      } catch (error) {
        setSaveStatus({
          type: "error",
          message:
            error.response?.data?.message ||
            "Failed to fetch achievements.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Handle header inputs
  const handleHeaderChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle stat inputs
  const handleStatChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.map((stat) =>
        stat.id === id
          ? { ...stat, [field]: value }
          : stat
      ),
    }));
  };



 

  // PUT updated achievements
  const handleSave = async () => {
    try {
      setIsSaving(true);
      setSaveStatus(null);

      const res = await updateAchievements(formData);

      if (res?.success) {
        setFormData(res.data);

        setSaveStatus({
          type: "success",
          message: "Achievements updated successfully!",
        });
      }
    } catch (error) {
      setSaveStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Failed to update achievements.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex items-center gap-3">
          <RiLoader4Line className="animate-spin text-xl" />
          <span>Loading achievements...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-800">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Manage Achievements
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Edit and publish your achievements section.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg transition"
        >
          {isSaving ? (
            <RiLoader4Line className="animate-spin" />
          ) : (
            <RiSaveLine />
          )}

          {isSaving ? "Publishing..." : "Publish Changes"}
        </button>
      </div>

      {/* Save Status */}
      {saveStatus && (
        <div
          className={`max-w-[1600px] mx-auto mb-6 p-4 rounded-lg text-sm ${
            saveStatus.type === "success"
              ? "bg-emerald-950 border border-emerald-800 text-emerald-200"
              : "bg-rose-950 border border-rose-800 text-rose-200"
          }`}
        >
          {saveStatus.message}
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT: Form */}
        <div className="lg:col-span-5 space-y-6">

          {/* Header Settings */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">

            <h2 className="text-lg font-semibold text-indigo-400">
              Section Header
            </h2>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Badge Text
              </label>

              <input
                type="text"
                name="badge"
                value={formData.badge}
                onChange={handleHeaderChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Main Heading
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleHeaderChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Description
              </label>

              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleHeaderChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm resize-none"
              />
            </div>

          </div>

          {/* Stats Settings */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-indigo-400">
                Milestones ({formData.stats.length})
              </h2>

             
            </div>

            {formData.stats.map((stat, index) => (
              <div
                key={stat._id || stat.id}
                className="bg-slate-900 border border-slate-700 rounded-xl p-4 space-y-3"
              >

                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">
                    CARD #{index + 1}
                  </span>

                </div>

                {/* Icon and Number */}
                <div className="grid grid-cols-2 gap-3">

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Icon
                    </label>

                    <select
                      value={stat.iconName}
                      onChange={(e) =>
                        handleStatChange(
                          stat.id,
                          "iconName",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
                    >
                      {AVAILABLE_ICONS.map((icon) => (
                        <option key={icon.value} value={icon.value}>
                          {icon.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Number
                    </label>

                    <input
                      value={stat.number}
                      onChange={(e) =>
                        handleStatChange(
                          stat.id,
                          "number",
                          e.target.value
                        )
                      }
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
                    />
                  </div>

                </div>

                {/* Label */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Label
                  </label>

                  <input
                    value={stat.label}
                    onChange={(e) =>
                      handleStatChange(
                        stat.id,
                        "label",
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
                  />
                </div>

                {/* Subtext */}
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Subtext
                  </label>

                  <input
                    value={stat.subtext}
                    onChange={(e) =>
                      handleStatChange(
                        stat.id,
                        "subtext",
                        e.target.value
                      )
                    }
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2 text-sm"
                  />
                </div>

              </div>
            ))}

          </div>
        </div>

        {/* RIGHT: Live Preview */}
        <div className="lg:col-span-7">

          <div className="sticky top-8 bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl">

            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3">
              <span className="text-xs font-mono text-slate-400">
                Live Preview
              </span>
            </div>

            <div className="overflow-x-auto">
              <AchievementsSection data={formData} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
