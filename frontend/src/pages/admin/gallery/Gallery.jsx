
import React, { useEffect, useRef, useState } from "react";
import {
  RiAddLine,
  RiEditBoxLine,
  RiEyeLine,
  RiDeleteBin6Line,
  RiUploadCloud2Line,
  RiCloseLine,
  RiImageLine,
} from "react-icons/ri";
import toast from "react-hot-toast";

import {
  createGallery,
  getGalleries,
  getGalleryById,
  updateGallery,
  deleteGallery,
  createGalleryCategory,
  getGalleryCategories,
  deleteGalleryCategory,
} from "../../../services/api";

// Change this according to your backend URL.
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Convert backend image path into a complete URL.
const getImageUrl = (image) => {
  if (!image) return "";

  if (image.startsWith("http")) return image;

  return `${API_URL}${image}`;
};

const initialItem = {
  title: "",
  category: "",
  imageFile: null,
  imagePreview: "",
};

export default function AdminGallerySection() {
  const [activeTab, setActiveTab] = useState("editor");

  // Gallery states
  const [galleryItems, setGalleryItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // Category form
  const [newCategoryInput, setNewCategoryInput] = useState("");

  // Gallery form
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [editingId, setEditingId] = useState(null);

  // Preview filter
  const [previewCategoryTab, setPreviewCategoryTab] = useState("All");

  // Object URL reference for image preview cleanup
  const previewUrlRef = useRef(null);

  const categories = [
    "All",
    ...categoryItems.map((category) => category.name),
  ];

  // ======================================
  // IMAGE PREVIEW HELPERS
  // ======================================

  const clearObjectUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  };

  const resetForm = () => {
    clearObjectUrl();
    setEditingId(null);
    setCurrentItem({
      ...initialItem,
      category: categoryItems[0]?.name || "",
    });
  };

  useEffect(() => {
    return () => {
      clearObjectUrl();
    };
  }, []);

  // ======================================
  // GET GALLERY AND CATEGORIES
  // ======================================

  const loadGalleryData = async () => {
    try {
      setLoading(true);

      const [galleryRes, categoryRes] = await Promise.all([
        getGalleries(),
        getGalleryCategories(),
      ]);

      if (galleryRes.success) {
        setGalleryItems(galleryRes.galleries || []);
      }

      if (categoryRes.success) {
        setCategoryItems(categoryRes.categories || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load gallery."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGalleryData();
  }, []);

  // ======================================
  // ADD CATEGORY
  // ======================================

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const name = newCategoryInput.trim();

    if (!name) {
      toast.error("Please enter a category name.");
      return;
    }

    try {
      setCategoryLoading(true);

      const res = await createGalleryCategory(name);

      if (res.success) {
        setCategoryItems((prev) => [...prev, res.category]);

        setNewCategoryInput("");

        // Automatically select the first category when appropriate.
        if (!currentItem.category) {
          setCurrentItem((prev) => ({
            ...prev,
            category: res.category.name,
          }));
        }

        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create category."
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  // ======================================
  // DELETE CATEGORY
  // ======================================

  const handleDeleteCategory = async (category) => {
    if (!category) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) return;

    try {
      const res = await deleteGalleryCategory(category._id);

      if (res.success) {
        setCategoryItems((prev) =>
          prev.filter((item) => item._id !== category._id)
        );

        if (currentItem.category === category.name) {
          setCurrentItem((prev) => ({
            ...prev,
            category: "",
          }));
        }

        if (previewCategoryTab === category.name) {
          setPreviewCategoryTab("All");
        }

        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete category."
      );
    }
  };

  // ======================================
  // IMAGE UPLOAD
  // ======================================

  const handleImageUpload = (file) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB.");
      return;
    }

    clearObjectUrl();

    const previewUrl = URL.createObjectURL(file);

    previewUrlRef.current = previewUrl;

    setCurrentItem((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));
  };

  const handleRemoveImage = () => {
    clearObjectUrl();

    setCurrentItem((prev) => ({
      ...prev,
      imageFile: null,
      imagePreview: editingId ? prev.imagePreview : "",
    }));
  };

  // ======================================
  // CREATE / UPDATE GALLERY
  // ======================================

  const handleSaveItem = async (e) => {
    e.preventDefault();

    if (!currentItem.title.trim()) {
      toast.error("Please enter a photo title.");
      return;
    }

    if (!currentItem.category) {
      toast.error("Please select a category.");
      return;
    }

    if (!editingId && !currentItem.imageFile) {
      toast.error("Please upload a gallery image.");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", currentItem.title.trim());
      formData.append("category", currentItem.category);

      if (currentItem.imageFile) {
        formData.append("image", currentItem.imageFile);
      }

      let res;

      if (editingId) {
        res = await updateGallery(editingId, formData);
      } else {
        res = await createGallery(formData);
      }

      if (res.success) {
        toast.success(res.message);

        // Refresh gallery data from the database.
        await loadGalleryData();

        resetForm();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to save gallery item."
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================
  // EDIT GALLERY
  // ======================================

  const handleEditClick = async (item) => {
    try {
      const res = await getGalleryById(item._id);

      if (res.success) {
        clearObjectUrl();

        setCurrentItem({
          title: res.gallery.title,
          category: res.gallery.category,
          imageFile: null,
          imagePreview: getImageUrl(res.gallery.image),
        });

        setEditingId(res.gallery._id);

        setActiveTab("editor");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load gallery item."
      );
    }
  };

  // ======================================
  // DELETE GALLERY
  // ======================================

  const handleDeleteClick = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const res = await deleteGallery(id);

      if (res.success) {
        setGalleryItems((prev) =>
          prev.filter((item) => item._id !== id)
        );

        if (editingId === id) {
          resetForm();
        }

        toast.success(res.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete gallery item."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ======================================
  // PREVIEW FILTER
  // ======================================

  const filteredPreviewGallery =
    previewCategoryTab === "All"
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === previewCategoryTab
        );

  // ======================================
  // LOADING UI
  // ======================================

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">
            Loading gallery management...
          </p>
        </div>
      </div>
    );
  }

  // ======================================
  // MAIN UI
  // ======================================

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">

      {/* TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Manage Gallery Section
          </h1>

          <p className="text-xs text-slate-500 mt-1">
            Add photos, organize categories, and preview your gallery.
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* TAB SWITCHER */}
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
              Editor
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
              Live Preview
            </button>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Auto Saved
          </span>
        </div>
      </div>

      {/* ================================== */}
      {/* EDITOR VIEW */}
      {/* ================================== */}

      {activeTab === "editor" && (
        <div className="space-y-6">

          {/* SECTION 1: CATEGORY MANAGEMENT */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">

            <div>
              <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                1. Gallery Filter Categories
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Create and manage categories for your gallery images.
              </p>
            </div>

            <form
              onSubmit={handleAddCategory}
              className="flex gap-2 max-w-md"
            >
              <input
                type="text"
                placeholder="New Category Name..."
                value={newCategoryInput}
                onChange={(e) =>
                  setNewCategoryInput(e.target.value)
                }
                maxLength={50}
                className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={categoryLoading}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
              >
                <RiAddLine className="w-4 h-4 text-amber-400" />
                {categoryLoading ? "Adding..." : "Add"}
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
                All
                <span className="ml-1 text-[10px]">Default</span>
              </span>

              {categoryItems.map((category) => (
                <span
                  key={category._id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium"
                >
                  {category.name}

                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                    title={`Delete ${category.name}`}
                    className="text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <RiCloseLine className="w-4 h-4" />
                  </button>
                </span>
              ))}

              {categoryItems.length === 0 && (
                <p className="text-xs text-slate-400">
                  No categories available. Create your first category.
                </p>
              )}
            </div>
          </div>

          {/* SECTION 2: ADD / EDIT GALLERY ITEM */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                  2. {editingId ? "Edit Gallery Item" : "Add New Gallery Photo"}
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {editingId
                    ? "Update your existing gallery photo."
                    : "Upload a new photo to your school gallery."}
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-red-500 hover:text-red-700 underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">

              {/* TITLE AND CATEGORY */}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

                <div className="md:col-span-8">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Photo Title *
                  </label>

                  <input
                    type="text"
                    required
                    maxLength={150}
                    placeholder="e.g. Annual Sports Meet"
                    value={currentItem.title}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="md:col-span-4">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Tag *
                  </label>

                  <select
                    required
                    value={currentItem.category}
                    onChange={(e) =>
                      setCurrentItem((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {categoryItems.map((category) => (
                      <option
                        key={category._id}
                        value={category.name}
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* IMAGE UPLOAD */}

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Gallery Image *
                </label>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                  {/* UPLOAD AREA */}

                  <div className="md:col-span-8">
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();

                        handleImageUpload(
                          e.dataTransfer.files?.[0]
                        );
                      }}
                      className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-xl cursor-pointer bg-slate-50 hover:bg-amber-50/30 transition-colors p-4 text-center"
                    >
                      <RiUploadCloud2Line className="w-8 h-8 text-amber-500 mb-2" />

                      <p className="text-xs font-semibold text-slate-700">
                        Click to upload or drag & drop image
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1">
                        PNG, JPG, WEBP up to 5MB
                      </p>

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          handleImageUpload(e.target.files?.[0]);
                          e.target.value = "";
                        }}
                      />
                    </label>
                  </div>

                  {/* IMAGE PREVIEW */}

                  <div className="md:col-span-4">
                    {currentItem.imagePreview ? (
                      <div className="relative h-36 rounded-xl overflow-hidden border border-slate-200 group bg-slate-900">

                        <img
                          src={currentItem.imagePreview}
                          alt="Gallery preview"
                          className="w-full h-full object-cover"
                        />

                        {currentItem.imageFile && (
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute inset-0 bg-slate-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs gap-1"
                          >
                            <RiDeleteBin6Line className="w-4 h-4 text-red-400" />
                            Remove Selected Image
                          </button>
                        )}

                        {!currentItem.imageFile && editingId && (
                          <span className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-slate-950/70 text-white text-[10px]">
                            Current Image
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-36 rounded-xl border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-xs text-slate-400 gap-2">
                        <RiImageLine className="w-7 h-7" />
                        No Image Selected
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SUBMIT */}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={saving || categoryItems.length === 0}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  {editingId ? (
                    <RiEditBoxLine className="w-4 h-4 text-amber-400" />
                  ) : (
                    <RiAddLine className="w-4 h-4 text-amber-400" />
                  )}

                  <span>
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Item"
                      : "Add to Gallery"}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* SECTION 3: GALLERY ITEMS */}

          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4 shadow-sm">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-wider">
                  3. Current Gallery Items
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  {galleryItems.length} photos available in your gallery.
                </p>
              </div>
            </div>

            {galleryItems.length === 0 ? (
              <div className="text-center py-10 text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                <RiImageLine className="w-8 h-8 mx-auto mb-2" />

                No items in gallery yet. Add one using the form above.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {galleryItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 border border-slate-200 rounded-2xl bg-slate-50/60 space-y-3 hover:border-amber-400/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="relative h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-200">

                        {item.image ? (
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.title}
                            loading="lazy"
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
                        className="px-2 py-1.5 bg-white border border-slate-200 hover:border-amber-500 rounded-lg text-slate-700 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiEditBoxLine className="w-3.5 h-3.5 text-amber-500" />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={deletingId === item._id}
                        onClick={() => handleDeleteClick(item._id)}
                        className="px-2 py-1.5 bg-white border border-slate-200 hover:border-red-500 disabled:opacity-50 rounded-lg text-red-600 text-[11px] font-semibold flex items-center gap-1 transition-colors"
                      >
                        <RiDeleteBin6Line className="w-3.5 h-3.5" />

                        {deletingId === item._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================== */}
      {/* LIVE PREVIEW */}
      {/* ================================== */}

      {activeTab === "preview" && (
        <div className="rounded-3xl border border-slate-300 overflow-hidden shadow-xl">

          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
            <span>PREVIEW MODE: Gallery UI Output</span>

            <span className="text-amber-400">
              Live Render
            </span>
          </div>

          <section className="py-16 bg-slate-50 text-slate-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

              {/* CATEGORY FILTERS */}

              <div className="flex flex-wrap items-center justify-center gap-2">
                {categories.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setPreviewCategoryTab(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 outline-none ${
                      previewCategoryTab === cat
                        ? "bg-slate-900 text-white shadow-md"
                        : "bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* GALLERY GRID */}

              {filteredPreviewGallery.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No images in this category.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                  {filteredPreviewGallery.map((item) => (
                    <div
                      key={item._id}
                      className="group relative h-96 rounded-3xl overflow-hidden shadow-md bg-slate-900 border border-slate-200/60"
                    >
                      {item.image && (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                        />
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
