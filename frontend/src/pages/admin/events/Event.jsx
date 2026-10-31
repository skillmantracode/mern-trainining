
import React, { useEffect, useState } from "react";
import {
  RiAddLine,
  RiEditBoxLine,
  RiDeleteBin6Line,
  RiEyeLine,
  RiEditLine,
  RiCalendarLine,
  RiImageLine,
  RiExternalLinkLine,
  RiLoader4Line,
  RiSaveLine,
  RiCloseLine,
} from "react-icons/ri";

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../../../services/api";

import toast from "react-hot-toast";

const FACULTIES = [
  "Computer Engineering",
  "Hotel Management",
  "Education",
  "General",
];

const API_URL = "http://localhost:5000";

const getImageUrl = (filename) => {
  if (!filename) return "";

  return `${API_URL}/uploads/${encodeURIComponent(filename)}`;
};

const getEventStatus = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today ? "Upcoming" : "Past";
};

const initialForm = {
  title: "",
  faculty: "Computer Engineering",
  date: "",
  facebookUrl: "",
};

export default function AdminEventSection() {
  const [activeTab, setActiveTab] = useState("editor");

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await getEvents();

      if (res.data?.success) {
        setEvents(res.data.events || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset form
  const resetForm = () => {
    setForm(initialForm);
    setImage(null);
    setExistingImage("");
    setEditingId(null);
  };

  // CREATE / UPDATE EVENT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !image) {
      return toast.error("Please select an event image.");
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());
      formData.append("faculty", form.faculty);
      formData.append("date", form.date);
      formData.append("facebookUrl", form.facebookUrl.trim());

      if (image) {
        formData.append("image", image);
      }

      let res;

      if (editingId) {
        res = await updateEvent(editingId, formData);
      } else {
        res = await createEvent(formData);
      }

      if (res.data?.success) {
        toast.success(res.data.message);

        resetForm();
        await fetchEvents();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // EDIT EVENT - GET BY ID
  const handleEdit = async (id) => {
    try {
      const res = await getEventById(id);

      if (res.data?.success) {
        const event = res.data.event;

        setForm({
          title: event.title || "",
          faculty: event.faculty || FACULTIES[0],
          date: event.date
            ? new Date(event.date).toISOString().split("T")[0]
            : "",
          facebookUrl: event.facebookUrl || "",
        });

        setExistingImage(event.image || "");
        setImage(null);
        setEditingId(event._id);

        setActiveTab("editor");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to get event."
      );
    }
  };

  // DELETE EVENT
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      const res = await deleteEvent(id);

      if (res.data?.success) {
        toast.success(res.data.message);

        if (editingId === id) {
          resetForm();
        }

        await fetchEvents();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete event."
      );
    }
  };

  const upcomingCount = events.filter(
    (event) => getEventStatus(event.date) === "Upcoming"
  ).length;

  const pastCount = events.length - upcomingCount;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Event Management
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Create, manage and publish school events.
          </p>
        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setActiveTab("editor")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
              activeTab === "editor"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <RiEditLine />
            Editor
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold ${
              activeTab === "preview"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <RiEyeLine />
            Preview
          </button>

        </div>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Total Events</p>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {events.length}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Upcoming Events</p>
          <h2 className="text-2xl font-bold text-emerald-600 mt-2">
            {upcomingCount}
          </h2>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500">Past Events</p>
          <h2 className="text-2xl font-bold text-slate-500 mt-2">
            {pastCount}
          </h2>
        </div>

      </div>

      {activeTab === "editor" && (
        <div className="space-y-6">

          {/* EVENT FORM */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="font-bold text-slate-900">
                  {editingId ? "Update Event" : "Create New Event"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Add event information and its Facebook post.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center gap-1 text-xs text-red-500"
                >
                  <RiCloseLine />
                  Cancel
                </button>
              )}

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* TITLE */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Event Name *
                  </label>

                  <input
                    type="text"
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter event name"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500"
                  />
                </div>

                {/* FACULTY */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Faculty *
                  </label>

                  <select
                    name="faculty"
                    value={form.faculty}
                    onChange={handleChange}
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-amber-500"
                  >
                    {FACULTIES.map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Event Date *
                  </label>

                  <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500"
                  />
                </div>

                {/* FACEBOOK URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Facebook Post URL *
                  </label>

                  <input
                    type="url"
                    name="facebookUrl"
                    required
                    value={form.facebookUrl}
                    onChange={handleChange}
                    placeholder="https://www.facebook.com/..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500"
                  />
                </div>

              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Event Image *
                </label>

                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5">

                  {existingImage && !image && (
                    <div className="mb-4">
                      <img
                        src={getImageUrl(existingImage)}
                        alt="Current event"
                        className="w-48 h-32 object-cover rounded-xl"
                      />

                      <p className="text-xs text-slate-500 mt-2">
                        Current event image
                      </p>
                    </div>
                  )}

                  {image && (
                    <div className="mb-4">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected event"
                        className="w-48 h-32 object-cover rounded-xl"
                      />

                      <p className="text-xs text-slate-500 mt-2">
                        {image.name}
                      </p>
                    </div>
                  )}

                  <label className="flex items-center justify-center gap-2 cursor-pointer text-sm font-semibold text-slate-600 hover:text-amber-600">
                    <RiImageLine className="text-xl" />

                    {image ? "Change Image" : "Choose Event Image"}

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/jpg"
                      className="hidden"
                      onChange={(e) => {
                        setImage(e.target.files?.[0] || null);
                      }}
                    />
                  </label>

                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    JPG, PNG or WEBP
                  </p>

                </div>
              </div>

              {/* SUBMIT */}
              <div className="flex justify-end">

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-colors"
                >
                  {submitting ? (
                    <RiLoader4Line className="animate-spin" />
                  ) : editingId ? (
                    <RiSaveLine />
                  ) : (
                    <RiAddLine />
                  )}

                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Event"
                    : "Create Event"}
                </button>

              </div>

            </form>
          </div>

          {/* EVENT LIST */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">

            <div className="flex justify-between items-center mb-5">
              <h2 className="font-bold text-slate-900">
                All Events
              </h2>

              <span className="text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600">
                {events.length} Events
              </span>
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-400">
                <RiLoader4Line className="animate-spin text-2xl mx-auto" />
                <p className="text-xs mt-2">Loading events...</p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No events found. Create your first event.
              </div>
            ) : (

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {events.map((event) => (

                  <div
                    key={event._id}
                    className="flex gap-4 p-3 border border-slate-200 rounded-2xl hover:border-amber-300 transition-colors"
                  >

                    <img
                      src={getImageUrl(event.image)}
                      alt={event.title}
                      className="w-24 h-24 rounded-xl object-cover bg-slate-100 shrink-0"
                    />

                    <div className="flex-1 min-w-0">

                      <span className={`inline-block text-[10px] font-bold px-2 py-1 rounded-full ${
                        getEventStatus(event.date) === "Upcoming"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {getEventStatus(event.date)}
                      </span>

                      <h3 className="text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">
                        {event.faculty}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>

                      <div className="flex gap-2 mt-3">

                        <button
                          type="button"
                          onClick={() => handleEdit(event._id)}
                          className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100"
                          title="Edit event"
                        >
                          <RiEditBoxLine />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(event._id)}
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete event"
                        >
                          <RiDeleteBin6Line />
                        </button>

                        <a
                          href={event.facebookUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                          title="Facebook post"
                        >
                          <RiExternalLinkLine />
                        </a>

                      </div>
                    </div>
                  </div>

                ))}

              </div>
            )}

          </div>
        </div>
      )}

      {/* LIVE PREVIEW */}
      {activeTab === "preview" && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6">

          <h2 className="font-bold text-slate-900 mb-5">
            Public Event Preview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {events.map((event) => (

              <a
                key={event._id}
                href={event.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 group"
              >

                <img
                  src={getImageUrl(event.image)}
                  alt={event.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="p-4">

                  <span className="text-xs font-semibold text-emerald-700">
                    {getEventStatus(event.date)}
                  </span>

                  <h3 className="font-bold text-slate-900 mt-2">
                    {event.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2">
                    {event.faculty}
                  </p>

                </div>
              </a>

            ))}

          </div>
        </div>
      )}

    </div>
  );
}
