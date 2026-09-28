import React, { useState } from "react";
import {
  RiFilterLine,
  RiHotelLine,
  RiComputerLine,
  RiBook3Line,
  RiGlobalLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiBuilding2Line,
} from "react-icons/ri";

export default function AdminEventSection() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Available Icon Options mapped to keys for dynamic icon rendering
  const iconOptions = [
    { key: "hotel", label: "Hotel Management (Hotel Icon)" },
    { key: "computer", label: "Computer Engineering (Laptop Icon)" },
    { key: "education", label: "Education (Book Icon)" },
    { key: "general", label: "General (Global Icon)" },
  ];

  // Helper function to render icon component based on key
  const renderEventIcon = (key) => {
    switch (key) {
      case "hotel":
        return <RiHotelLine className="w-10 h-10 text-white" />;
      case "computer":
        return <RiComputerLine className="w-10 h-10 text-white" />;
      case "education":
        return <RiBook3Line className="w-10 h-10 text-white" />;
      case "general":
        return <RiGlobalLine className="w-10 h-10 text-white" />;
      default:
        return <RiBuilding2Line className="w-10 h-10 text-white" />;
    }
  };

  // Departments list state
  const [departments, setDepartments] = useState([
    { id: "All", label: "All" },
    { id: "Hotel Management", label: "Hotel Management" },
    { id: "Computer Engineering", label: "Computer Engineering" },
    { id: "Education", label: "Education" },
    { id: "General", label: "General" },
  ]);

  const [newDepartmentInput, setNewDepartmentInput] = useState("");

  // Events list state
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Hospitality & Culinary Workshop 2026",
      department: "Hotel Management",
      iconKey: "hotel",
    },
    {
      id: 2,
      title: "National Tech Hackathon & Expo",
      department: "Computer Engineering",
      iconKey: "computer",
    },
    {
      id: 3,
      title: "Pedagogy & Teaching Excellence Seminar",
      department: "Education",
      iconKey: "education",
    },
    {
      id: 4,
      title: "Annual Sports Day & Cultural Meet",
      department: "General",
      iconKey: "general",
    },
  ]);

  // Form State for Adding/Editing an Event Item
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    department: "Hotel Management",
    iconKey: "hotel",
  });

  const [editingId, setEditingId] = useState(null);

  // State for Live Preview Tab Filtering
  const [previewDepartmentTab, setPreviewDepartmentTab] = useState("All");

  // Add / Delete Department Handlers
  const handleAddDepartment = (e) => {
    e.preventDefault();
    const trimmed = newDepartmentInput.trim();
    if (trimmed && !departments.some((d) => d.id === trimmed)) {
      setDepartments((prev) => [...prev, { id: trimmed, label: trimmed }]);
      setNewDepartmentInput("");
    }
  };

  const handleDeleteDepartment = (deptId) => {
    if (deptId === "All") return;
    setDepartments((prev) => prev.filter((d) => d.id !== deptId));
  };

  // Save Event Handler
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!currentEvent.title.trim()) return;

    if (editingId) {
      setEvents((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentEvent, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setEvents((prev) => [...prev, { ...currentEvent, id: Date.now() }]);
    }

    // Reset Form
    setCurrentEvent({
      title: "",
      department: departments[1]?.id || "Hotel Management",
      iconKey: "hotel",
    });
  };

  const handleEditClick = (eventItem) => {
    setCurrentEvent(eventItem);
    setEditingId(eventItem.id);
  };

  const handleDeleteClick = (id) => {
    setEvents((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentEvent({
        title: "",
        department: departments[1]?.id || "Hotel Management",
        iconKey: "hotel",
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Filter events for Preview
  const filteredPreviewEvents =
    previewDepartmentTab === "All"
      ? events
      : events.filter((e) => e.department === previewDepartmentTab);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Controls & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Program & Event Cards
          </h1>
          <p className="text-xs text-slate-500">
            Configure department filter tags, add blueprint-styled event cards, and preview changes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tab Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "editor"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RiEditBoxLine className="w-4 h-4" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === "preview"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <RiEyeLine className="w-4 h-4" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Save All Button */}
          <button
            type="button"
            onClick={handleGlobalSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {isSaved ? (
              <RiCheckDoubleLine className="w-4 h-4" />
            ) : (
              <RiSave3Line className="w-4 h-4" />
            )}
            <span>{isSaved ? "Saved All!" : "Save All Changes"}</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: EDITOR FORM */}
      {activeTab === "editor" && (
        <div className="space-y-6">
          {/* SECTION 1: MANAGE DEPARTMENTS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              1. Department Filter Tags
            </h2>

            <form onSubmit={handleAddDepartment} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="New Department Name..."
                value={newDepartmentInput}
                onChange={(e) => setNewDepartmentInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RiAddLine className="w-4 h-4 text-amber-400" />
                <span>Add Tag</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-1">
              {departments.map((dept) => (
                <span
                  key={dept.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  <span>{dept.label}</span>
                  {dept.id !== "All" && (
                    <button
                      type="button"
                      onClick={() => handleDeleteDepartment(dept.id)}
                      className="text-slate-400 hover:text-red-600 text-xs font-bold transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 2: ADD / EDIT PROGRAM EVENT */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                2. {editingId ? "Edit Program Event Card" : "Add New Program Event Card"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentEvent({
                      title: "",
                      department: departments[1]?.id || "Hotel Management",
                      iconKey: "hotel",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-6">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Event / Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hospitality & Culinary Workshop 2026"
                    value={currentEvent.title}
                    onChange={(e) =>
                      setCurrentEvent((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Department Tag
                  </label>
                  <select
                    value={currentEvent.department}
                    onChange={(e) =>
                      setCurrentEvent((prev) => ({
                        ...prev,
                        department: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {departments
                      .filter((d) => d.id !== "All")
                      .map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.label}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Card Blueprint Icon
                  </label>
                  <select
                    value={currentEvent.iconKey}
                    onChange={(e) =>
                      setCurrentEvent((prev) => ({
                        ...prev,
                        iconKey: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.key} value={opt.key}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Event Card" : "Add Event Card"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: LIST OF EVENTS */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              3. Current Program Cards ({events.length})
            </h2>

            {events.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No event cards created yet. Use the form above to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-slate-200 rounded-2xl bg-slate-900 text-white flex items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                        {renderEventIcon(item.iconKey)}
                      </div>

                      <div className="min-w-0 space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {item.department}
                        </span>
                        <h4 className="text-xs font-bold truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEditClick(item)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs transition-colors"
                      >
                        <RiEditBoxLine className="w-4 h-4 text-amber-400" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item.id)}
                        className="p-2 bg-white/10 hover:bg-red-500/20 rounded-lg text-red-400 transition-colors"
                      >
                        <RiDeleteBin6Line className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: LIVE PREVIEW SECTION */}
      {activeTab === "preview" && (
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Event & Program Section UI</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section className="py-16 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Top Header Filter Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
                    <RiFilterLine className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Program Filter
                    </h3>
                    <p className="text-xs text-slate-500">
                      Browse by department
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {departments.map((dept) => (
                    <button
                      type="button"
                      key={dept.id}
                      onClick={() => setPreviewDepartmentTab(dept.id)}
                      className={`px-5 py-2 rounded-full text-xs font-semibold transition-all outline-none cursor-pointer ${
                        previewDepartmentTab === dept.id
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                      }`}
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprint Style Cards Grid */}
              {filteredPreviewEvents.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No events found for this department filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPreviewEvents.map((item) => (
                    <div
                      key={item.id}
                      className="relative h-64 rounded-3xl bg-slate-900 p-8 flex flex-col justify-between overflow-hidden shadow-lg border border-slate-800 group"
                    >
                      {/* Subtle Grid Accent Pattern Overlay */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />

                      {/* Department Badge */}
                      <div className="relative z-10">
                        <span className="inline-block px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                          {item.department}
                        </span>
                      </div>

                      {/* Center Blueprint Icon */}
                      <div className="relative z-10 flex items-center justify-center my-auto">
                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {renderEventIcon(item.iconKey)}
                        </div>
                      </div>

                      {/* Title */}
                      <div className="relative z-10">
                        <h4 className="text-lg font-bold text-white truncate">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}