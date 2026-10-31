
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  
 
  Globe,
  Save,
  Loader2,
  CheckCircle2,
  School,
  FileText,
} from "lucide-react";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiLinkedinFill,
} from "react-icons/ri";

import {
  getFooter,
  createFooter,
  updateFooter,
} from "../../../services/api";

const INITIAL_DATA = {
  schoolName: "",
  description: "",
  contact: {
    address: "",
    phone: "",
    email: "",
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
    linkedin: "",
  },
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

const SectionHeader = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
      <Icon size={19} />
    </div>

    <div>
      <h2 className="text-base font-semibold text-gray-800">
        {title}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  </div>
);

const FormField = ({ label, icon: Icon, children, hint }) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon size={15} className="text-gray-400" />}
      {label}
    </label>

    {children}

    {hint && (
      <p className="text-xs text-gray-400">{hint}</p>
    )}
  </div>
);

function FooterManagement() {
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await getFooter();

        if (res?.success && res?.footer) {
          setFormData({
            ...INITIAL_DATA,
            ...res.footer,
            contact: {
              ...INITIAL_DATA.contact,
              ...res.footer.contact,
            },
            socialLinks: {
              ...INITIAL_DATA.socialLinks,
              ...res.footer.socialLinks,
            },
          });

          setIsExisting(true);
        }
      } catch (error) {
        if (error?.response?.status !== 404) {
          toast.error(
            error?.response?.data?.message ||
              "Failed to fetch footer information."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFooter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, name, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = isExisting
        ? await updateFooter(formData)
        : await createFooter(formData);

      if (res?.success) {
        setIsExisting(true);

        setFormData({
          ...INITIAL_DATA,
          ...res.footer,
          contact: {
            ...INITIAL_DATA.contact,
            ...res.footer.contact,
          },
          socialLinks: {
            ...INITIAL_DATA.socialLinks,
            ...res.footer.socialLinks,
          },
        });

        toast.success(
          res.message || "Footer information saved successfully."
        );
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  const socialFields = [
    {
      name: "facebook",
      label: "Facebook",
      icon: RiFacebookFill,
      placeholder: "https://facebook.com/your-school",
    },
    {
      name: "instagram",
      label: "Instagram",
      icon: RiInstagramLine,
      placeholder: "https://instagram.com/your-school",
    },
    {
      name: "youtube",
      label: "YouTube",
      icon: RiYoutubeFill,
      placeholder: "https://youtube.com/@your-school",
    },
    {
      name: "linkedin",
      label: "LinkedIn",
      icon: RiInstagramLine,
      placeholder: "https://linkedin.com/company/your-school",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <Loader2 className="animate-spin text-blue-600" size={20} />
          Loading footer settings...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <School size={16} />
              Website Settings
              <span className="text-gray-300">/</span>
              Footer
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Footer Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Manage your school's public information, contact details,
              and social media links displayed across your website.
            </p>
          </div>

          <div className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold ${
            isExisting
              ? "bg-green-50 text-green-700"
              : "bg-amber-50 text-amber-700"
          }`}>
            <span className={`h-2 w-2 rounded-full ${
              isExisting ? "bg-green-500" : "bg-amber-500"
            }`} />
            {isExisting ? "Configuration Active" : "Not Configured"}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* School Information */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
              <SectionHeader
                icon={Building2}
                title="School Information"
                description="Basic information about your institution."
              />
            </div>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <div className="sm:col-span-2">
                <FormField label="School Name" icon={School}>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="Enter your school name"
                    className={inputClass}
                    required
                  />
                </FormField>
              </div>

              <div className="sm:col-span-2">
                <FormField
                  label="School Description"
                  icon={FileText}
                  hint="A short introduction displayed in your website footer."
                >
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write a brief description about your school..."
                    rows={4}
                    maxLength={500}
                    className={`${inputClass} resize-y`}
                    required
                  />

                  <div className="mt-1 text-right text-xs text-gray-400">
                    {formData.description.length}/500
                  </div>
                </FormField>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
              <SectionHeader
                icon={Phone}
                title="Contact Information"
                description="Contact details visitors can use to reach your school."
              />
            </div>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <div className="sm:col-span-2">
                <FormField label="School Address" icon={MapPin}>
                  <input
                    type="text"
                    value={formData.contact.address}
                    onChange={(e) =>
                      handleNestedChange(
                        "contact",
                        "address",
                        e.target.value
                      )
                    }
                    placeholder="Enter school address"
                    className={inputClass}
                    required
                  />
                </FormField>
              </div>

              <FormField label="Phone Number" icon={Phone}>
                <input
                  type="tel"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    handleNestedChange(
                      "contact",
                      "phone",
                      e.target.value
                    )
                  }
                  placeholder="Enter phone number"
                  className={inputClass}
                  required
                />
              </FormField>

              <FormField label="Email Address" icon={Mail}>
                <input
                  type="email"
                  value={formData.contact.email}
                  onChange={(e) =>
                    handleNestedChange(
                      "contact",
                      "email",
                      e.target.value
                    )
                  }
                  placeholder="school@example.com"
                  className={inputClass}
                  required
                />
              </FormField>
            </div>
          </section>

          {/* Social Media */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-5 sm:px-8">
              <SectionHeader
                icon={Globe}
                title="Social Media Links"
                description="Connect your school's social media accounts. These fields are optional."
              />
            </div>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              {socialFields.map((field) => {
                const Icon = field.icon;

                return (
                  <FormField
                    key={field.name}
                    label={field.label}
                    icon={Icon}
                  >
                    <input
                      type="url"
                      value={formData.socialLinks[field.name]}
                      onChange={(e) =>
                        handleNestedChange(
                          "socialLinks",
                          field.name,
                          e.target.value
                        )
                      }
                      placeholder={field.placeholder}
                      className={inputClass}
                    />
                  </FormField>
                );
              })}
            </div>
          </section>

          {/* Save Area */}
          <div className="sticky bottom-0 z-10 -mx-4 border-t border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle2 size={16} className="text-green-600" />
                Your changes will appear on the public website.
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    {isExisting ? "Save Changes" : "Create Footer"}
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default FooterManagement;
