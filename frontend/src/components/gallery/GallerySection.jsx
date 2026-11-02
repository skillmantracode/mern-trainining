
import React, { useEffect, useState } from "react";

import {
  getGalleries,
  getGalleryCategories,
} from "../../services/api";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  return `${API_URL}${image}`;
};

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const [galleryItems, setGalleryItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Selected image for lightbox
  const [selectedImage, setSelectedImage] = useState(null);

  // Fetch gallery data
  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const [galleryRes, categoryRes] = await Promise.all([
          getGalleries(),
          getGalleryCategories(),
        ]);

        if (galleryRes.success) {
          setGalleryItems(galleryRes.galleries || []);
        }

        if (categoryRes.success) {
          setCategories([
            "All",
            ...(categoryRes.categories || []).map(
              (category) => category.name
            ),
          ]);
        }
      } catch (error) {
        console.error("Gallery loading error:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load gallery. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  // Close lightbox with Escape key
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while image is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  // Filter gallery
  const filteredGallery =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeTab
        );

  // Loading
  if (loading) {
    return (
      <section className="py-20 bg-slate-50">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-500">
            Loading gallery...
          </p>
        </div>
      </section>
    );
  }

  // Error
  if (error) {
    return (
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-16 bg-slate-50 text-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* CATEGORY FILTERS */}

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
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

          {/* GALLERY CARDS */}

          {filteredGallery.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No images available in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item._id}
                  className="group relative h-96 rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200/60"
                >
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    loading="lazy"
                    onDoubleClick={() =>
                      setSelectedImage({
                        src: getImageUrl(item.image),
                        title: item.title,
                        category: item.category,
                      })
                    }
                    className="w-full h-full object-cover cursor-zoom-in group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />

                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* CATEGORY */}

                  <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold tracking-wider uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* TITLE */}

                  <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-none">
                    <h3 className="text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* IMAGE LIGHTBOX */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white text-3xl hover:bg-white/20 transition"
            aria-label="Close image preview"
          >
            &times;
          </button>

          {/* IMAGE CONTENT */}

          <div
            className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />

            <div className="text-center mt-4">
              <h3 className="text-white text-lg font-semibold">
                {selectedImage.title}
              </h3>

              <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
