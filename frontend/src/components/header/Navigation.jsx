import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import {
  RiAccountCircleLine,
  RiArrowDownSFill,
  RiUser3Line,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiMenu3Line,
  RiCloseLine,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";

function Navigation() {
  const {logoutUser}=useAuth()
  const navigate=useNavigate()
   const {isLoggedin,user}=useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navmenu = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about", isHash: true },
    { name: "Programs", link: "/programs" },
    { name: "Syllabus", link: "/syllabus" },
    { name: "Notices", link: "/notices" },
    { name: "Events", link: "/events" },
    { name: "Gallery", link: "/gallery" },
  ];
  const handleLoginToggle = async () => {
    setIsLoggedin((prev) => !prev);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    const res= await logoutUser();
    if(res){
   navigate("/")
    }
  };

  const handleProfileToggle = () => {
    setIsProfileOpen((prev) => !prev);
  };


  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-slate-200/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo Section */}
        {/* Brand Logo Section */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://siddhababa.edu.np/Images/5e0d1a16-ec31-40ae-81b5-9d8722c93cf2.png"
            alt="Shree Siddhababa Secondary School"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {navmenu.map((item) => (
            <li key={item.name}>
              {item.isHash ? (
                <HashLink
                  smooth
                  to={item.link}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.name}
                </HashLink>
              ) : (
                <Link
                  to={item.link}
                  className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 relative">
          <Link
            to="/enquiry"
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-sm transition-all"
          >
            Start an enquiry
            <RiArrowRightUpLine className="text-base" />
          </Link>

          {!isLoggedin ? (
            <Link
              to="/login"
              className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleProfileToggle}
              className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-200/60 hover:bg-slate-200 px-3 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <RiAccountCircleLine className="text-xl" />
              <span>{user?.username}</span>
              <RiArrowDownSFill />
            </button>
          )}

          {/* Profile Dropdown */}
          {isLoggedin && isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 text-sm">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-900">{user?.username}</p>
              </div>

              <Link
                to="/profile"
                onClick={handleLoginToggle}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left cursor-pointer"
              >
                <RiUser3Line /> Profile
              </Link>

              <button className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors text-left cursor-pointer">
                <RiSettings4Line /> Settings
              </button>

              <div className="border-t border-slate-100 my-1"></div>

              <button
                onClick={()=>{
                  handleLogout();
                  handleLoginToggle()
                }}
                
                className="w-full flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
              >
                <RiLogoutBoxRLine /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 text-2xl focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <RiCloseLine /> : <RiMenu3Line />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4">
          <ul className="flex flex-col gap-3">
            {navmenu.map((item) => (
              <li key={item.name}>
                {item.isHash ? (
                  <HashLink
                    smooth
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1.5 text-base font-semibold text-slate-700 hover:text-slate-900"
                  >
                    {item.name}
                  </HashLink>
                ) : (
                  <Link
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1.5 text-base font-semibold text-slate-700 hover:text-slate-900"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              to="/enquiry"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-full text-center"
            >
              Start an enquiry
              <RiArrowRightUpLine className="text-base" />
            </Link>

            {!isLoggedin ? (
              <Link
                to="/login"
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  handleLoginToggle();
                  handleLogout()
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-red-600 bg-red-50 rounded-xl"
              >
                Logout ({user?.username})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;
