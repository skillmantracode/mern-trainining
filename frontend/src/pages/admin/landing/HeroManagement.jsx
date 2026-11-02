import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiEditLine,
  RiCloseLine,
  RiImageLine,
  RiSearchLine,
  RiEyeLine,
  RiCheckLine,
  RiRefreshLine,
} from "react-icons/ri";

import {
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from "../../../services/api";

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

const getHeroImageUrl = (filename) =>
  filename
    ? `${BACKEND_URL}/uploads/${encodeURIComponent(filename)}`
    : "";

const initialForm = {
  tag: "",
  nepaliTitle: "",
  title: "",
  subtitle: "",
  description: "",
  tags: "",
  bgImage: "",
  isActive: true,
  order: 0,
};

function HeroManagement() {
  const [slides, setSlides] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Release temporary browser object URLs when the preview changes/unmounts.
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const res = await getAllHeroSlides();

      if (res?.success) {
        setSlides(
          [...(res.slides || [])].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0)
          )
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch hero slides"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const stats = useMemo(() => {
    const active = slides.filter((slide) => slide.isActive).length;

    return {
      total: slides.length,
      active,
      inactive: slides.length - active,
    };
  }, [slides]);

  const filteredSlides = useMemo(() => {
    const query = search.trim().toLowerCase();

    return slides.filter((slide) => {
      const matchesSearch =
        !query ||
        slide.title?.toLowerCase().includes(query) ||
        slide.tag?.toLowerCase().includes(query);

      const matchesFilter =
        filter === "all" ||
        (filter === "active" && slide.isActive) ||
        (filter === "inactive" && !slide.isActive);

      return matchesSearch && matchesFilter;
    });
  }, [slides, search, filter]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
    setSelectedImage(null);
    setImagePreview("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleEdit = (slide) => {
    setEditingId(slide._id);
    setForm({
      tag: slide.tag || "",
      nepaliTitle: slide.nepaliTitle || "",
      title: slide.title || "",
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      tags: slide.tags?.join(", ") || "",
      bgImage: slide.bgImage || "",
      isActive: Boolean(slide.isActive),
      order: slide.order ?? 0,
    });
    setSelectedImage(null);
    setImagePreview("");
    setIsOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsOpen(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.tag.trim() ||
      !form.title.trim() ||
      !form.description.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    // An existing slide can keep its current image when no new file is selected.
    if (!editingId && !selectedImage) {
      toast.error("Please select a background image");
      return;
    }

    const payload = new FormData();

    payload.append("tag", form.tag.trim());
    payload.append("nepaliTitle", form.nepaliTitle.trim());
    payload.append("title", form.title.trim());
    payload.append("subtitle", form.subtitle.trim());
    payload.append("description", form.description.trim());
    payload.append(
      "tags",
      JSON.stringify(
        form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      )
    );
    payload.append("order", String(Number(form.order) || 0));
    payload.append("isActive", String(form.isActive));

    if (selectedImage) {
      // Must match upload.single("bgImage") in the Express route.
      payload.append("bgImage", selectedImage);
    }

    try {
      setSaving(true);

      const res = editingId
        ? await updateHeroSlide(editingId, payload)
        : await createHeroSlide(payload);

      if (res?.success) {
        toast.success(res.message || "Hero slide saved successfully");

        setSlides((prev) => {
          const updated = editingId
            ? prev.map((slide) =>
                slide._id === editingId ? res.slide : slide
              )
            : [...prev, res.slide];

          return [...updated].sort(
            (a, b) => (a.order ?? 0) - (b.order ?? 0)
          );
        });

        setIsOpen(false);
        resetForm();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to save hero slide"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this hero slide?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      const res = await deleteHeroSlide(id);

      if (res?.success) {
        setSlides((prev) => prev.filter((slide) => slide._id !== id));
        toast.success(res.message || "Hero slide deleted");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete hero slide"
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggle = async (slide) => {
    try {
      setUpdatingId(slide._id);

      // This endpoint accepts a JSON body for this status-only update.
      const res = await updateHeroSlide(slide._id, {
        isActive: !slide.isActive,
      });

      if (res?.success) {
        setSlides((prev) =>
          prev.map((item) =>
            item._id === slide._id ? res.slide : item
          )
        );

        toast.success(
          res.slide.isActive
            ? "Slide activated successfully"
            : "Slide deactivated successfully"
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update slide status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center gap-3 text-gray-500">
        <RiRefreshLine className="animate-spin text-xl" />
        Loading hero slides...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-2">
            <RiImageLine size={18} />
            WEBSITE MANAGEMENT
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Hero Section
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Manage homepage slides, content, images and visibility.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-sm transition"
        >
          <RiAddLine size={21} />
          Add New Slide
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total Slides"
          value={stats.total}
          icon={<RiImageLine />}
          color="blue"
        />
        <StatCard
          title="Active Slides"
          value={stats.active}
          icon={<RiCheckLine />}
          color="green"
        />
        <StatCard
          title="Inactive Slides"
          value={stats.inactive}
          icon={<RiEyeLine />}
          color="orange"
        />
      </div>

      {/* Search and filters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
            <input
              type="text"
              placeholder="Search by slide title or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {["all", "active", "inactive"].map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold capitalize transition ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide count and refresh */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-lg text-slate-800">
          Your Slides
          <span className="text-sm font-medium text-slate-400 ml-2">
            ({filteredSlides.length})
          </span>
        </h2>

        <button
          type="button"
          onClick={fetchSlides}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"
        >
          <RiRefreshLine />
          Refresh
        </button>
      </div>

      {/* Slides */}
      {filteredSlides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredSlides.map((slide) => (
            <article
              key={slide._id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-52 bg-slate-200 overflow-hidden">
                <img
                  src={getHeroImageUrl(slide.bgImage)}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

                <span
                  className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold ${
                    slide.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {slide.isActive ? "● Active" : "○ Inactive"}
                </span>

                <span className="absolute bottom-4 left-4 text-white text-sm font-semibold flex items-center gap-2">
                  <RiImageLine />
                  Slide #{slide.order}
                </span>
              </div>

              <div className="p-5">
                <p className="text-xs font-bold tracking-wider text-blue-600 uppercase">
                  {slide.tag}
                </p>
                <h3 className="text-lg font-bold text-slate-900 mt-2 line-clamp-1">
                  {slide.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                  {slide.subtitle}
                </p>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed line-clamp-2">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {slide.tags?.slice(0, 3).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 mt-5 pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
                    <input
                      type="checkbox"
                      checked={Boolean(slide.isActive)}
                      disabled={updatingId === slide._id}
                      onChange={() => handleToggle(slide)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    {updatingId === slide._id
                      ? "Updating..."
                      : "Show on homepage"}
                  </label>

                  <span className="text-xs text-slate-400">
                    Order: {slide.order}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => handleEdit(slide)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold text-sm transition"
                  >
                    <RiEditLine size={17} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(slide._id)}
                    disabled={deletingId === slide._id}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold text-sm transition disabled:opacity-50"
                  >
                    <RiDeleteBinLine size={17} />
                    {deletingId === slide._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl py-20 px-5 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <RiImageLine size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mt-5">
            No slides found
          </h3>
          <p className="text-sm text-slate-500 mt-2">
            {search || filter !== "all"
              ? "Try changing your search or filter."
              : "Start by creating your first homepage slide."}
          </p>
          {!search && filter === "all" && (
            <button
              type="button"
              onClick={handleAdd}
              className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold"
            >
              Add First Slide
            </button>
          )}
        </div>
      )}

      {/* Create / edit modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white w-full max-w-3xl max-h-[94vh] overflow-y-auto rounded-2xl shadow-2xl">
            <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {editingId ? "Edit Hero Slide" : "Create Hero Slide"}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Manage your homepage slider content.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <RiCloseLine size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <section>
                <h3 className="font-bold text-slate-800 mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Top Tag"
                    name="tag"
                    value={form.tag}
                    onChange={handleChange}
                    placeholder="EXCELLENCE IN EDUCATION"
                    required
                  />
                  <FormField
                    label="Nepali Title"
                    name="nepaliTitle"
                    value={form.nepaliTitle}
                    onChange={handleChange}
                    placeholder="विद्यालयको नाम"
                  />
                  <FormField
                    label="Main Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter main heading"
                    required
                  />
                  <FormField
                    label="Subtitle"
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    placeholder="Enter subtitle"
                  />
                </div>
              </section>

              <div className="border-t border-slate-100" />

              <section>
                <h3 className="font-bold text-slate-800 mb-4">
                  Slide Description
                </h3>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Write an engaging description for your homepage..."
                  className="w-full border border-slate-200 rounded-xl p-4 outline-none resize-y focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </section>

              <div className="border-t border-slate-100" />

              <section>
                <h3 className="font-bold text-slate-800 mb-4">
                  Feature Tags
                </h3>
                <FormField
                  label="Tags (comma separated)"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="Computer Engineering, Modern Labs, Sports"
                />
                <p className="text-xs text-slate-400 mt-2">
                  Example: Computer Engineering, Science, Technology
                </p>
              </section>

              <div className="border-t border-slate-100" />

              <section>
                <h3 className="font-bold text-slate-800 mb-4">
                  Background Image
                </h3>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Image
                  {!editingId && <span className="text-red-500 ml-1">*</span>}
                </label>

                <label className="flex flex-col items-center justify-center w-full min-h-40 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-blue-50 hover:border-blue-400 transition p-6">
                  <RiImageLine size={32} className="text-blue-500 mb-3" />
                  <span className="text-sm font-semibold text-slate-700">
                    Click to upload an image
                  </span>
                  <span className="text-xs text-slate-400 mt-2">
                    JPG, PNG or WEBP (Maximum 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {(imagePreview || form.bgImage) && (
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      IMAGE PREVIEW
                    </p>
                    <img
                      src={imagePreview || getHeroImageUrl(form.bgImage)}
                      alt="Hero background preview"
                      className="w-full h-48 object-cover rounded-xl bg-slate-100"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      {selectedImage?.name || form.bgImage}
                    </p>
                  </div>
                )}
              </section>

              <div className="border-t border-slate-100" />

              <section>
                <h3 className="font-bold text-slate-800 mb-4">
                  Slide Settings
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    label="Display Order"
                    name="order"
                    type="number"
                    value={form.order}
                    onChange={handleChange}
                    min="0"
                  />

                  <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleChange}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-slate-800">
                        Active Slide
                      </span>
                      <span className="block text-xs text-slate-500">
                        Display this slide on homepage
                      </span>
                    </span>
                  </label>
                </div>
              </section>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Slide"
                    : "Create Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className={`p-3 rounded-xl ${styles[color]}`}>
          {React.cloneElement(icon, { size: 22 })}
        </div>
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mt-4">{value}</h3>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  min,
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
      />
    </div>
  );
}

export default HeroManagement;
