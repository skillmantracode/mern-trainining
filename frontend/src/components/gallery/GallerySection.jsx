import React, { useState } from "react";

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Events", "Academic", "Facilities", "Activities"];

  const galleryItems = [
    {
      id: 1,
      title: "Annual Day Celebration",
      category: "Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "High-Tech Computer Lab",
      category: "Academic",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Hotel Management Training Kitchen",
      category: "Facilities",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Annual Sports Meet",
      category: "Activities",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredGallery =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Category Pill Filters (Matching Image 2) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 outline-none ${
                activeTab === cat
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200/60"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold tracking-wider uppercase">
                  {item.category}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}