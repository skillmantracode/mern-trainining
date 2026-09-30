import React, { useState, useEffect } from "react";
import { getMessage } from "../../services/api"; // Adjust import path if needed

const BACKEND_BASE_URL = "http://localhost:5000"; // Replace with your actual backend base URL

export default function WelcomeSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        setLoading(true);
        const response = await getMessage();
        
        // Adjust nested structure based on API response payload
        const welcomeData = response?.data?.data || response?.data?.welcome || response?.data;
        
        if (welcomeData) {
          setData(welcomeData);
        }
      } catch (err) {
        console.error("Failed to fetch welcome section data:", err);
        setError("Could not load welcome section.");
      } finally {
        setLoading(false);
      }
    };

    fetchWelcomeData();
  }, []);

  // Helper to format backend relative image paths into absolute URLs
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"; // Fallback image
    }
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `${BACKEND_BASE_URL}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
  };

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-slate-500 text-sm font-medium">Loading welcome message...</p>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return null; // Or render a fallback banner
  }

  // Extract key values into an array
  const keyValues = [
    data.keyValues1,
    data.keyValues2,
    data.keyValues3,
    data.keyValues4,
  ].filter(Boolean); // Filters out any empty or null values

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Principal Image & Title */}
        <div className="flex flex-col items-center">
          <div className="relative overflow-hidden rounded-3xl shadow-lg w-full max-w-lg bg-slate-100 aspect-[4/5] flex items-center justify-center">
            <img
              src={getImageUrl(data.principalPic)}
              alt={`${data.principalName || "Principal"}, ${data.role || "Principal"}`}
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => {
                // Fallback image if loaded URL breaks
                e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
          <div className="mt-5 text-center">
            <p className="text-xl font-medium text-slate-900 tracking-tight uppercase">
              {data.principalName}
            </p>
            <p className="text-sm text-slate-600 font-medium uppercase">
              {data.role}
            </p>
          </div>
        </div>

        {/* Right Side: Welcome Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          
          {/* Badge */}
          {data.topText && (
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-8 shadow-xs">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.6h7.6z" />
              </svg>
              <span>{data.topText}</span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-950 tracking-tight leading-tight mb-8">
            {data.mainHeadline}
          </h1>

          {/* Separator */}
          <div className="w-20 h-px bg-slate-300 mb-8 mx-auto md:mx-0"></div>

          {/* Body Paragraph */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mb-12 font-normal whitespace-pre-line">
            {data.welcomeParagraph}
          </p>

          {/* Value Pills */}
          {keyValues.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full max-w-lg md:max-w-none">
              {keyValues.map((value, idx) => (
                <span
                  key={idx}
                  className="px-6 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold shadow-2xs hover:bg-white hover:shadow-xs transition-all text-center flex items-center justify-center"
                >
                  {value}
                </span>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}