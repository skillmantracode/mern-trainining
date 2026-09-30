import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  RiDashboardLine,
  RiMessage3Line,
  RiInformationLine,
  RiTrophyLine,
  RiQuestionnaireLine,
  RiFileList3Line,
  RiCalendarEventLine,
  RiGraduationCapLine,
  RiGroupLine,
  RiGalleryLine,
  RiBookOpenLine,
  RiNotification3Line,
  RiSettings4Line,
  RiUserLine,
  RiBankCardLine,
  RiOrganizationChart,
  RiBriefcaseLine,
  RiLayoutGridLine,
  RiArrowDownSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

export default function SideBar() {
  const { user } = useAuth();
  const location = useLocation();

  // State to track collapsible sections (default open if on a child route)
  const [isLandingPageOpen, setIsLandingPageOpen] = useState(
    location.pathname.startsWith("/admin/landing") ||
      [
        "/admin/welcome-message",
        "/admin/achievement",
        "/admin/choose-reason",
        "/admin/about",
        "/admin/gallery",
        "/admin/programs",
        "/admin/notices",
        "/admin/syllabus",
        "/admin/events",
      ].some((path) => location.pathname.startsWith(path))
  );

  const userRole = user?.userDetail?.designation?.title?.trim().toLowerCase() || "";

  // Navigation schema with parent-child structure
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <RiDashboardLine />,
      link: "/admin",
      roles: ["principal", "admin", "accountant"],
    },
    {
      id: "landing-page",
      label: "Landing Page",
      icon: <RiLayoutGridLine />,
      roles: ["principal", "admin"],
      children: [
        {
          id: "welcome-message",
          label: "Welcome Message",
          icon: <RiMessage3Line />,
          link: "/admin/welcome-message",
          roles: ["principal", "admin"],
        },
        {
          id: "achievement",
          label: "Achievement",
          icon: <RiTrophyLine />,
          link: "/admin/achievement",
          roles: ["principal", "admin"],
        },
        {
          id: "choose-reason",
          label: "Why Choose Us",
          icon: <RiQuestionnaireLine />,
          link: "/admin/choose-reason",
          roles: ["principal", "admin"],
        },
        {
          id: "about",
          label: "About",
          icon: <RiInformationLine />,
          link: "/admin/about",
          roles: ["principal", "admin"],
        },
        {
          id: "gallery",
          label: "Gallery",
          icon: <RiGalleryLine />,
          link: "/admin/gallery",
          roles: ["principal", "admin"],
        },
        {
          id: "programs",
          label: "Programs",
          icon: <RiBookOpenLine />,
          link: "/admin/programs",
          roles: ["principal", "admin"],
        },
        {
          id: "notices",
          label: "Notices",
          icon: <RiNotification3Line />,
          link: "/admin/notices",
          roles: ["principal", "admin", "accountant"],
        },
        {
          id: "syllabus",
          label: "Syllabus",
          icon: <RiFileList3Line />,
          link: "/admin/syllabus",
          roles: ["principal", "admin"],
        },
        {
          id: "events",
          label: "Events",
          icon: <RiCalendarEventLine />,
          link: "/admin/events",
          roles: ["principal", "admin", "accountant"],
        },
      ],
    },
    {
      id: "users",
      label: "Users",
      icon: <RiUserLine />,
      link: "/admin/users",
      roles: ["principal", "admin"],
    },
    {
      id: "students",
      label: "Students",
      icon: <RiGraduationCapLine />,
      link: "/admin/students",
      roles: ["principal", "admin", "accountant"],
    },
    {
      id: "teachers",
      label: "Staff",
      icon: <RiGroupLine />,
      link: "/admin/staffs",
      roles: ["principal", "admin", "accountant"],
    },
    
    {
      id: "settings",
      label: "Settings",
      icon: <RiSettings4Line />,
      link: "/admin/settings",
      roles: ["principal", "admin","accountant"],
    },
    {
      id: "designation",
      label: "Manage Designation",
      icon: <RiBriefcaseLine />,
      link: "/admin/designation",
      roles: ["principal", "admin"],
    },
    {
      id: "department",
      label: "Manage Department",
      icon: <RiOrganizationChart />,
      link: "/admin/department",
      roles: ["principal", "admin"],
    },
  ];

  // Filter items and child items based on role
  const filteredNavItems = useMemo(() => {
    return navItems
      .filter((item) => item.roles.includes(userRole))
      .map((item) => {
        if (item.children) {
          return {
            ...item,
            children: item.children.filter((child) => child.roles.includes(userRole)),
          };
        }
        return item;
      })
      .filter((item) => !item.children || item.children.length > 0);
  }, [userRole]);

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-100 p-4">
      <div className="flex-1 overflow-y-auto pr-1">
        {/* Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-slate-100">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-bold">
            S
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Siddhababa Admin</h2>
            <p className="text-[10px] text-slate-400">School Management</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {filteredNavItems.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some(
                (child) => location.pathname === child.link
              );

              return (
                <div key={item.id} className="space-y-1">
                  {/* Parent Accordion Button */}
                  <button
                    onClick={() => setIsLandingPageOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isChildActive
                        ? "bg-amber-50 text-amber-900"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-sm text-slate-400">
                      {isLandingPageOpen ? <RiArrowDownSLine /> : <RiArrowRightSLine />}
                    </span>
                  </button>


                  {/* Child Items */}
                  {isLandingPageOpen && (
                    <div className="pl-4 space-y-1 border-l-2 border-slate-100 ml-4">
                      {item.children.map((child) => {
                        const isActive = location.pathname === child.link;
                        return (
                          <Link
                            to={child.link}
                            key={child.id}
                            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                              isActive
                                ? "bg-amber-500 text-slate-950 font-semibold"
                                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                            }`}
                          >
                            <span className="text-sm">{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = location.pathname === item.link;
            return (
              <Link
                to={item.link}
                key={item.id}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3 px-2 mt-auto">
        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
          {getInitials(user?.username || user?.name)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-900 truncate">
{user?.userDetail?.fullname || user?.username || "User"}
          </p>
          <p className="text-[10px] text-amber-600 font-medium capitalize truncate">
            {userRole || "Guest"}
          </p>
        </div>
      </div>
    </div>
  );
}