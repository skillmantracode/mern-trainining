
import React, { useEffect, useState } from "react";
import {
  RiLoader4Line,
  RiCalendarLine,
  RiExternalLinkLine,
} from "react-icons/ri";

import { getEvents } from "../../services/api";
const API_URL = "http://localhost:5000";

const FACULTIES = [
  "All Faculties",
  "Computer Engineering",
  "Hotel Management",
  "Education",
  "General",
];

const getImageUrl = (filename) => {
  if (!filename) return "";

  return `${API_URL}/uploads/${encodeURIComponent(filename)}`;
};

const getEventStatus = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate >= today ? "upcoming" : "past";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function EventSection() {
  const [events, setEvents] = useState([]);

  const [activePeriod, setActivePeriod] = useState("upcoming");
  const [activeFaculty, setActiveFaculty] = useState("All Faculties");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET EVENTS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getEvents();

        if (res.data?.success) {
          setEvents(res.data.events || []);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Unable to load events."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // FILTER EVENTS
  const filteredEvents = events
    .filter(
      (event) => getEventStatus(event.date) === activePeriod
    )
    .filter(
      (event) =>
        activeFaculty === "All Faculties" ||
        event.faculty === activeFaculty
    )
    .sort(
      (a, b) =>
        activePeriod === "upcoming"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
    );

  return (
    <section className="py-16 sm:py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADING */}
        <div className="text-center mb-10">

          <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            Campus Activities
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
            Events & Activities
          </h2>

          <p className="text-sm text-slate-500 mt-3 max-w-xl mx-auto">
            Explore the latest events, activities and memorable moments
            from our different faculties.
          </p>

        </div>

        {/* UPCOMING / PAST FILTER */}
        <div className="max-w-md mx-auto mb-5">

          <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-full">

            <button
              type="button"
              onClick={() => setActivePeriod("upcoming")}
              className={`py-3 rounded-full text-sm font-semibold transition-all ${
                activePeriod === "upcoming"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Upcoming
            </button>

            <button
              type="button"
              onClick={() => setActivePeriod("past")}
              className={`py-3 rounded-full text-sm font-semibold transition-all ${
                activePeriod === "past"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Past Events
            </button>

          </div>
        </div>

        {/* FACULTY FILTER */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 pb-7 border-b border-slate-100">

          {FACULTIES.map((faculty) => {

            const isActive = activeFaculty === faculty;

            return (
              <button
                key={faculty}
                type="button"
                onClick={() => setActiveFaculty(faculty)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900"
                }`}
              >
                {faculty}
              </button>
            );
          })}

        </div>

        {/* LOADING */}
        {loading && (
          <div className="py-16 flex flex-col items-center text-slate-400">
            <RiLoader4Line className="text-3xl animate-spin" />
            <p className="text-sm mt-3">Loading events...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="py-12 text-center text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="py-16 text-center">

            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center">
              <RiCalendarLine className="text-2xl text-slate-400" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 mt-4">
              No {activePeriod === "upcoming" ? "Upcoming" : "Past"} Events
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              No events found for {activeFaculty.toLowerCase()}.
            </p>

          </div>
        )}

        {/* EVENT CARDS */}
        {!loading && !error && filteredEvents.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            {filteredEvents.map((event) => (

              <a
                key={event._id}
                href={event.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View Facebook post about ${event.title}`}
                className="group block min-w-0"
              >

                {/* EVENT IMAGE */}
                <div className="relative overflow-hidden rounded-2xl aspect-[16/11] bg-slate-100">

                  <img
                    src={getImageUrl(event.image)}
                    alt={event.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-4 right-4 bg-white/95 rounded-full p-2.5 text-slate-800 opacity-0 group-hover:opacity-100 transition-all">
                    <RiExternalLinkLine className="text-lg" />
                  </div>

                </div>

                {/* EVENT INFORMATION */}
                <div className="pt-4">

                  <div className="flex items-center gap-2 flex-wrap">

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        activePeriod === "upcoming"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {activePeriod === "upcoming" ? "Upcoming" : "Past Event"}
                    </span>

                    <span className="text-xs text-slate-400">
                      {formatDate(event.date)}
                    </span>

                  </div>

                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mt-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2">
                    {event.faculty}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                    View Facebook Post
                    <RiExternalLinkLine />
                  </div>

                </div>

              </a>

            ))}

          </div>
        )}

      </div>
    </section>
  );
}
