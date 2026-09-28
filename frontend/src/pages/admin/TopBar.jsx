import { RiSearchLine, RiAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";

// 1. Move static configuration outside the component
const TOP_BAR_NAV = [
  {
    id: "New Notice",
    label: "New Notice",
    icon: <RiAddLine />,
    link: "/admin/notices",
    roles: ["principal", "admin"],
  },
  {
    id: "Add Students",
    label: "Add Students",
    icon: <RiAddLine />,
    link: "/admin/students/add-students",
    roles: ["principal", "admin"],
  },
  {
    id: "Add Staffs",
    label: "Add Staffs",
    icon: <RiAddLine />,
    link: "/admin/staffs/add-staffs",
    roles: ["principal", "admin"],
  },
  {
    id: "Create User",
    label: "Create User",
    icon: <RiAddLine />,
    link: "/admin/users/create",
    roles: ["principal", "admin"],
  },
];

export default function TopBar() {
  const { user, loading } = useAuth(); // Assuming your context exposes a loading state

  // 2. Safely extract and normalize the user role
  const userRole =
    user?.userDetail?.designation?.title?.trim().toLowerCase() || "";

  // 3. Filter buttons based on allowed roles
  const filteredNavItems = useMemo(() => {
    if (!userRole) return [];
    return TOP_BAR_NAV.filter((item) => item.roles.includes(userRole));
  }, [userRole]);

  // How to verify if the step was successful: Check that buttons render when logged in as "admin" or "principal", and are hidden for other roles.
  if (loading) {
    return <div className="text-xs text-slate-400">Loading navigation...</div>;
  }

  return (
    <>
      {/* Search Input */}
      <div className="relative w-64">
        <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* Role-Based Navigation Buttons */}
      <div className="flex justify-around gap-5">
        {filteredNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  );
}