import { Link } from "react-router-dom";
import {
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiSendPlaneFill,
  RiFacebookFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiLinkedinFill,
  RiGraduationCapLine,
} from "react-icons/ri";

function Footer() {
  const quickLinks = [
    { name: "About Us", link: "/#about" },
    { name: "Admission", link: "/admission" },
    { name: "Syllabus", link: "/syllabus" },
    { name: "Notices", link: "/notices" },
    { name: "Events", link: "/events" },
    { name: "Gallery", link: "/gallery" },
  ];

  const programs = [
    { name: "Primary (1–5)", link: "/programs#primary" },
    { name: "Lower Secondary (6–8)", link: "/programs#lower-secondary" },
    { name: "Secondary (9–10)", link: "/programs#secondary" },
    { name: "Higher Secondary (11–12)", link: "/programs#higher-secondary" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-[#0b1222] text-slate-300 pt-16 pb-12 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                <RiGraduationCapLine />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Shree Siddhababa
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Knowledge · Character · Leadership. Educating thoughtful, capable
              young people in the region since 1998.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <RiFacebookFill className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <RiInstagramLine className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <RiYoutubeFill className="text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-slate-700 hover:border-slate-500 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <RiLinkedinFill className="text-lg" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase">
              Programs
            </h3>
            <ul className="flex flex-col gap-2.5">
              {programs.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.link}
                    className="text-sm text-slate-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold tracking-widest text-amber-500 uppercase">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <RiMapPinLine className="text-lg text-slate-400 mt-0.5 shrink-0" />
                <span>
                  Ring Road, Butwal 32907, Rupandehi, Nepal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <RiPhoneLine className="text-lg text-slate-400 shrink-0" />
                <span>+977 1 5970 220</span>
              </li>
              <li className="flex items-center gap-3">
                <RiMailLine className="text-lg text-slate-400 shrink-0" />
                <span>info@siddhababa.edu.np</span>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div className="mt-2">
              <p className="text-xs text-slate-400 mb-2 font-medium">Newsletter</p>
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="you@email.com"
                  required
                  className="w-full bg-[#162032] border border-slate-700 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-amber-500 hover:bg-amber-400 rounded-full flex items-center justify-center text-slate-950 font-bold shrink-0 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <RiSendPlaneFill className="text-base" />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Shree Siddhababa Secondary School. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;