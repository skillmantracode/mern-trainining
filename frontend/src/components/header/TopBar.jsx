import React, { useEffect, useState } from "react";
import { Building2, MapPin, Phone } from "lucide-react";
import { getFooter } from "../../services/api";
const TopBar = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await getFooter();

        if (res?.success) {
          setFooter(res.footer);
        }
      } catch (error) {
        console.error("Failed to fetch footer:", error);
      }
    };

    fetchFooter();
  }, []);

  const schoolName =
    footer?.schoolName || "Shree Siddhababa Secondary School";

  const address = footer?.contact?.address;
  const phone = footer?.contact?.phone;

  const facebook = footer?.socialLinks?.facebook;
  const youtube = footer?.socialLinks?.youtube;

  return (
    <div className="w-full bg-[#087b08] text-white">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[42px] items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center min-w-0">

            {/* School */}
            <div className="flex items-center gap-1.5 pr-4">
              <Building2 className="h-4 w-4 shrink-0 text-yellow-400" />

              <span className="whitespace-nowrap text-[13px] font-medium">
                {schoolName}
              </span>
            </div>

            {/* Divider */}
            <span className="h-5 border-l border-white/30" />

            {/* Location */}
            {address && (
              <>
                <div className="flex items-center gap-1.5 px-4">
                  <MapPin className="h-4 w-4 shrink-0 text-yellow-400" />

                  <span className="whitespace-nowrap text-[13px]">
                    {address}
                  </span>
                </div>

                <span className="h-5 border-l border-white/30" />
              </>
            )}

            {/* Phone */}
            {phone && (
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-1.5 pl-4 text-[13px] transition-colors hover:text-yellow-300"
              >
                <Phone className="h-4 w-4 shrink-0 text-yellow-400" />

                <span className="whitespace-nowrap">
                  Call us: {phone}
                </span>
              </a>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center">

            {/* Online Admission */}
            <a
              href="#admission"
              className="px-4 text-[13px] font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Online Admission
            </a>

            <span className="h-5 border-l border-white/30" />

            {/* Emergency */}
            <a
              href="#emergency"
              className="px-4 text-[13px] font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Emergency No.
            </a>

            <span className="h-5 border-l border-white/30" />

            {/* Social Icons */}
            <div className="flex items-center gap-3 pl-4">

              {/* Facebook */}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="transition-colors hover:text-yellow-400"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {/* YouTube */}
              {youtube && (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="transition-colors hover:text-yellow-400"
                >
                  <svg
                    className="h-4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBar;