import React, { useState } from "react";
import {
  RiGalleryLine,
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiSave3Line,
  RiCheckDoubleLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiPriceTag3Line,
} from "react-icons/ri";

export default function AdminGallerySection() {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [isSaved, setIsSaved] = useState(false);

  // Category State (Allows dynamic creation/editing of categories)
  const [categories, setCategories] = useState([
    "All",
    "Events",
    "Academic",
    "Facilities",
    "Activities",
  ]);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  // Gallery Items State
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "Annual Day Celebration",
      category: "Events",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "High-Tech Computer Lab",
      category: "Academic",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Hotel Management Training Kitchen",
      category: "Facilities",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Annual Sports Meet",
      category: "Activities",
      imageFile: null,
      imagePreview:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  // Form State for Adding / Editing a Single Gallery Item
  const [currentItem, setCurrentItem] = useState({
    title: "",
    category: "Events",
    imageFile: null,
    imagePreview: "",
  });

  const [editingId, setEditingId] = useState(null);

  // State for Live Preview Tab Filtering
  const [previewCategoryTab, setPreviewCategoryTab] = useState("All");

  // Category Add/Delete Handlers
  const handleAddCategory = (e) => {
    e.preventDefault();
    const trimmed = newCategoryInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed]);
      setNewCategoryInput("");
    }
  };

  const handleDeleteCategory = (catToDelete) => {
    if (catToDelete === "All") return; // Keep default 'All'
    setCategories((prev) => prev.filter((cat) => cat !== catToDelete));
  };

  // Image Drag-and-Drop & File Picker Handler
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setCurrentItem((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: previewUrl,
      }));
    }
  };

  const handleRemoveImage = () => {
    setCurrentItem((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: "",
    }));
  };

  // Item Form Submit Handler
  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!currentItem.title.trim()) return;

    if (editingId) {
      setGalleryItems((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...currentItem, id: editingId } : item
        )
      );
      setEditingId(null);
    } else {
      setGalleryItems((prev) => [
        ...prev,
        { ...currentItem, id: Date.now() },
      ]);
    }

    // Reset Form
    setCurrentItem({
      title: "",
      category: categories[1] || "Events",
      imageFile: null,
      imagePreview: "",
    });
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setEditingId(item.id);
  };

  const handleDeleteClick = (id) => {
    setGalleryItems((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setCurrentItem({
        title: "",
        category: categories[1] || "Events",
        imageFile: null,
        imagePreview: "",
      });
    }
  };

  const handleGlobalSubmit = (e) => {
    e.preventDefault();
    // Submit galleryItems + categories to backend API
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Filter items for the live preview view
  const filteredPreviewGallery =
    previewCategoryTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === previewCategoryTab);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Gallery Section
          </h1>
          <p className="text-xs text-slate-500">
            Add photos, organize filter categories, and preview real-time visual outputs.
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

          {/* Global Save Button */}
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
          {/* SECTION 1: MANAGE CATEGORIES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              1. Gallery Filter Categories
            </h2>

            <form onSubmit={handleAddCategory} className="flex gap-2 max-w-md">
              <input
                type="text"
                placeholder="New Category Name..."
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                className="flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RiAddLine className="w-4 h-4 text-amber-400" />
                <span>Add</span>
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  <span>{cat}</span>
                  {cat !== "All" && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-slate-400 hover:text-red-600 text-xs font-bold transition-colors ml-0.5"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 2: ADD / EDIT GALLERY PHOTO ITEM */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
                2. {editingId ? "Edit Gallery Item" : "Add New Gallery Photo"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCurrentItem({
                      title: "",
                      category: categories[1] || "Events",
                      imageFile: null,
                      imagePreview: "",
                    });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Annual Sports Meet"
                    value={currentItem.title}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag
                  </label>
                  <select
                    value={currentItem.category}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    {categories
                      .filter((c) => c !== "All")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Upload Zone */}
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Image Upload
                </label>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8">
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          handleImageUpload(e.dataTransfer.files[0]);
                        }
                      }}
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-4 text-center"
                    >
                      <RiUploadCloud2Line className="w-7 h-7 text-amber-500 mb-1" />
                      <p className="text-xs font-semibold text-slate-700">
                        Click to upload or drag & drop image
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  <div className="md:col-span-4">
                    {currentItem.imagePreview ? (
                      <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">
                        <img
                          src={currentItem.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs gap-1"
                        >
                          <RiDeleteBin6Line className="w-4 h-4 text-red-400" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ) : (
                      <div className="h-32 rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-400 font-medium">
                        No Image Selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <RiAddLine className="w-4 h-4 text-amber-400" />
                  <span>
                    {editingId ? "Update Item" : "Add to Gallery"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: CURRENT GALLERY ITEMS GRID */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-amber-600">
              3. Current Gallery Items ({galleryItems.length})
            </h2>

            {galleryItems.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                No items in gallery yet. Add one using the form above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 border border-slate-200 rounded-2xl bg-slate-50/60 space-y-3 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                        {item.imagePreview ? (
                          <img
                            src={item.imagePreview}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                            No Image
                          </div>
                        )}
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-400 text-[10px] font-bold uppercase">
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/80">
                      <button
                        type="button"
                        onClick={() => handleEditClick(item)}
                        className="px-2 py-1 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(item.id)}
                        className="px-2 py-1 bg-white border border-slate-200 hover:border-red-500 rounded-lg text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiDeleteBin6Line className="w-3.5 h-3.5" />
                        <span>Delete</span>
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
            <span>PREVIEW MODE: Gallery UI Output</span>
            <span className="text-amber-400">Live Render</span>
          </div>

          {/* DYNAMIC LANDING PAGE SECTION OUTPUT */}
          <section className="py-16 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Category Pill Filters */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setPreviewCategoryTab(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 outline-none cursor-pointer ${
                      previewCategoryTab === cat
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Gallery Cards Grid */}
              {filteredPreviewGallery.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No images in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredPreviewGallery.map((item) => (
                    <div
                      key={item.id}
                      className="group relative h-96 rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200/60"
                    >
                      {item.imagePreview ? (
                        <img
                          src={item.imagePreview}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">
                          No Image Uploaded
                        </div>
                      )}
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
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}