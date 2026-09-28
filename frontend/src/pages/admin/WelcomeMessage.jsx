import React, { useState, useEffect } from "react";
import { getAssetUrl, getMessage, updateMessage } from "../../services/api";

const getWelcomeData = (response) =>
  response?.data || response?.welcome || response || null;

export default function WelcomeAdminPanel() {
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("PRINCIPAL");
  const [title, setTitle] = useState(
    "Greetings, We Warmly Welcome You To Shree Siddhababa Secondary School!"
  );
  const [description, setDescription] = useState(
    "A center of education, values, and excellence — A warm welcome to Shree Siddhababa Secondary School. Here, we empower students with discipline, creativity, and practical education to prepare them for national and international competition."
  );

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
  );
  const [isDragging, setIsDragging] = useState(false);

  const [badgeText, setBadgeText] = useState("A WARM WELCOME");
  const [values, setValues] = useState([
    "Quality Education",
    "Discipline",
    "Practical Learning",
    "Moral Values",
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Cleanup object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        setIsLoading(true);
        const response = await getMessage();
        const data = getWelcomeData(response);

        if (data) {
          if (data.principalName) setAuthorName(data.principalName);
          if (data.role) setAuthorRole(data.role);
          if (data.mainHeadline) setTitle(data.mainHeadline);
          if (data.welcomeParagraph) setDescription(data.welcomeParagraph);
          if (data.topText) setBadgeText(data.topText);
          if (data.principalPic) setImagePreview(getAssetUrl(data.principalPic));

          const fetchedValues = [
            data.keyValues1 || "",
            data.keyValues2 || "",
            data.keyValues3 || "",
            data.keyValues4 || "",
          ];

          if (fetchedValues.some((val) => val !== "")) {
            setValues(fetchedValues);
          }
        }
      } catch (error) {
        console.error("Error fetching welcome message:", error);
        setStatusMessage({
          type: "error",
          text: "Failed to load current message. You can create a new one.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWelcomeMessage();
  }, []);

  const handleFileChange = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    // Clean up previous blob URL if it exists
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview && imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ type: "", text: "" });

    try {
      const formData = new FormData();
      formData.append("principalName", authorName);
      formData.append("role", authorRole);
      formData.append("topText", badgeText);
      formData.append("mainHeadline", title);
      formData.append("welcomeParagraph", description);

      formData.append("keyValues1", values[0] || "");
      formData.append("keyValues2", values[1] || "");
      formData.append("keyValues3", values[2] || "");
      formData.append("keyValues4", values[3] || "");

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await updateMessage(formData);

      // Update preview with fresh URL returned from server response
      const updatedData = getWelcomeData(response);
      if (updatedData?.principalPic) {
        if (imagePreview && imagePreview.startsWith("blob:")) {
          URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(getAssetUrl(updatedData.principalPic));
      }
      
      // Reset selected file so state stays in sync
      setSelectedFile(null);

      setStatusMessage({
        type: "success",
        text: "Welcome message updated successfully!",
      });
    } catch (error) {
      console.error("Error updating welcome message:", error);
      setStatusMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to update welcome message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValueChange = (index, newValue) => {
    const updatedValues = [...values];
    updatedValues[index] = newValue;
    setValues(updatedValues);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-slate-500 font-medium">Loading CMS configuration...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-12 font-sans bg-slate-50/50">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Welcome Section CMS
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage and edit the content displayed in the landing page welcome section.
          </p>
        </div>

        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="authorName" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Principal Name
              </label>
              <input
                id="authorName"
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="authorRole" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Designation / Role
              </label>
              <input
                id="authorRole"
                type="text"
                required
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="badgeText" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Top Badge Text
              </label>
              <input
                id="badgeText"
                type="text"
                required
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-800"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                Main Headline
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Principal Photo Upload
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-6 transition-all text-center flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? "border-amber-500 bg-amber-50/50"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50"
              }`}
            >
              <input
                type="file"
                id="photoInput"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
                className="hidden"
              />

              {imagePreview ? (
                <div className="flex items-center gap-4 w-full max-w-md bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-16 h-16 rounded-lg object-cover border border-slate-100"
                  />
                  <div className="flex-1 text-left overflow-hidden">
                    <p className="text-xs font-semibold text-slate-800 truncate">
                      {selectedFile ? selectedFile.name : "Current Photo"}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {selectedFile
                        ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
                        : "Uploaded Image"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <label
                      htmlFor="photoInput"
                      className="px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg cursor-pointer transition-colors"
                    >
                      Change
                    </label>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="photoInput"
                  className="cursor-pointer flex flex-col items-center justify-center gap-2 py-4"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      PNG, JPG, or WEBP (Max 5MB)
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
              Welcome Paragraph
            </label>
            <textarea
              id="desc"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm text-slate-800 resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Key Value Pills (4 Items)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {values.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={val}
                  onChange={(e) => handleValueChange(idx, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 focus:outline-none focus:border-amber-500"
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 disabled:opacity-50 text-slate-950 font-bold text-sm py-2.5 px-6 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {isSubmitting ? "Updating..." : "Save & Publish Changes"}
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Homepage Section Preview
            </h3>
          </div>
        </div>

        <section className="bg-white py-16 px-4 sm:px-6 lg:px-12 rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-3xl shadow-lg w-full max-w-lg aspect-[4/3] bg-slate-100 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={authorName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-slate-400 text-xs font-medium">No photo selected</span>
                )}
              </div>
              <div className="mt-5 text-center">
                <p className="text-xl font-medium text-slate-900 tracking-tight">
                  {authorName}
                </p>
                <p className="text-sm text-slate-600 font-medium uppercase tracking-wider">
                  {authorRole}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-wider uppercase mb-8 shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7.2-6.3-4.6-6.3 4.6 2.3-7.2-6-4.6h7.6z" />
                </svg>
                <span>{badgeText}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-950 tracking-tight leading-tight mb-8">
                {title}
              </h1>

              <div className="w-20 h-px bg-slate-300 mb-8 mx-auto md:mx-0"></div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mb-10 font-normal">
                {description}
              </p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full max-w-lg md:max-w-none">
                {values.map((value, idx) => (
                  <span
                    key={idx}
                    className="px-6 py-3 rounded-full border border-slate-200 bg-slate-50/50 text-slate-800 text-sm font-semibold shadow-2xs transition-all text-center flex items-center justify-center"
                  >
                    {value || "Value Item"}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
