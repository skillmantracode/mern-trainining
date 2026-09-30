import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  GraduationCap,
  Users,
  Phone,
  MapPin,
  CalendarDays,
  BookOpen,
  Pencil,
} from "lucide-react";

import { getStudentById } from "../../../services/api";
import toast from "react-hot-toast";

export default function StudentDetail() {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  async function loadStudent(id) {
    try {
      const res = await getStudentById(id);
      console.log(res.data);
      
      setStudent(res.data.student);
    } catch (error) {
      console.error("Failed to load student:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudent(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading student...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/students"
              className="p-2 rounded-lg bg-white border border-slate-200
                         text-slate-600 hover:bg-slate-100 transition"
              title="Back to Students"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Student Details
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                View complete student information
              </p>
            </div>
          </div>

          <Link
            to={`/admin/students/${student._id}/edit`}
            className="inline-flex items-center justify-center gap-2
                       px-4 py-2.5 rounded-lg bg-blue-600 text-white
                       hover:bg-blue-700 transition font-medium"
          >
            <Pencil size={17} />
            Edit Student
          </Link>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-blue-100
                            flex items-center justify-center
                            text-blue-600 shrink-0">
              <User size={42} />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-slate-800">
                {student.name || "N/A"}
              </h2>

              <p className="text-slate-500 mt-1">
                {student.grade ? `Grade ${student.grade}` : "Grade N/A"}
                {student.section && ` • Section ${student.section}`}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                {student.gender && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    {student.gender}
                  </span>
                )}

                {student.academicYear && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                    {student.academicYear}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
          <SectionHeader
            icon={<User size={20} />}
            title="Student Information"
          />

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem
              icon={<User size={18} />}
              label="Full Name"
              value={student.name}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Date of Birth"
              value={student.dob}
            />

            <InfoItem
              icon={<User size={18} />}
              label="Gender"
              value={student.gender}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Phone"
              value={student.phone}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              label="Address"
              value={student.address}
            />
          </div>
        </section>

        {/* Academic Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
          <SectionHeader
            icon={<GraduationCap size={20} />}
            title="Academic Information"
          />

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoItem
              icon={<GraduationCap size={18} />}
              label="Grade"
              value={student.grade}
            />

            <InfoItem
              icon={<BookOpen size={18} />}
              label="Section"
              value={student.section}
            />

            <InfoItem
              icon={<BookOpen size={18} />}
              label="Faculty"
              value={student.faculty}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Academic Year"
              value={student.academicYear}
            />
          </div>
        </section>

        {/* Parent / Guardian Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-6 overflow-hidden">
          <SectionHeader
            icon={<Users size={20} />}
            title="Parent & Guardian Information"
          />

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoItem
              icon={<User size={18} />}
              label="Father's Name"
              value={student.fatherName}
            />

            <InfoItem
              icon={<User size={18} />}
              label="Mother's Name"
              value={student.motherName}
            />

            <InfoItem
              icon={<User size={18} />}
              label="Guardian Name"
              value={student.guardianName}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Guardian Phone"
              value={student.guardianPhone}
            />
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <SectionHeader
            icon={<Phone size={20} />}
            title="Contact Information"
          />

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem
              icon={<Phone size={18} />}
              label="Student Phone"
              value={student.phone}
            />

            <InfoItem
              icon={<Phone size={18} />}
              label="Guardian Phone"
              value={student.guardianPhone}
            />

            <InfoItem
              icon={<MapPin size={18} />}
              label="Address"
              value={student.address}
            />
          </div>
        </section>

      </div>
    </div>
  );
}

/* Section Header */
function SectionHeader({ icon, title }) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200">
      <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="font-semibold text-lg text-slate-800">
        {title}
      </h3>
    </div>
  );
}

/* Information Item */
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700 break-words">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}