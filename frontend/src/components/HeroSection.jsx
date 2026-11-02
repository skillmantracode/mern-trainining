import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import { getAllHeroSlides } from "../services/api";

const BACKEND_URL = (
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
).replace(/\/$/, "");

const getHeroImageUrl = (filename) =>
  filename ? `${BACKEND_URL}/uploads/${encodeURIComponent(filename)}` : "";

const AUTOPLAY_DELAY = 6000;

function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load active slides from MongoDB through the backend API.
  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        const res = await getAllHeroSlides();

        if (isMounted && res?.success) {
          const activeSlides = (res.slides || [])
            .filter((slide) => slide.isActive)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

          setSlides(activeSlides);
          setActiveIndex(0);
        }
      } catch (error) {
        console.error(
          "Failed to load hero slides:",
          error?.response?.data?.message || error.message,
        );
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  // Automatically move to the next slide.
  useEffect(() => {
    if (slides.length <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  if (loading) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-950 text-white">
        <p className="text-sm tracking-wide text-white/70">
          Loading homepage...
        </p>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-slate-950 px-6 text-center text-white">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
            Shree Siddhababa Secondary School
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold">
            Welcome to our school
          </h1>
          <p className="mt-4 text-white/70">
            Homepage slides are not available at the moment.
          </p>
        </div>
      </section>
    );
  }

  const slide = slides[activeIndex];

  return (
    <section className="relative isolate min-h-[680px] h-[calc(100vh-80px)] max-h-[900px] overflow-hidden bg-slate-950 text-white">
      {/* Slide background images */}
      {slides.map((item, index) => (
        <div
          key={item._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== activeIndex}
        >
          <img
            src={getHeroImageUrl(item.bgImage)}
            alt=""
            className="h-full w-full object-cover object-center"
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Dark overlays keep text readable */}
      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/10" />

      {/* Slide content */}
      <div className="relative z-10 mx-auto flex min-h-[680px] h-full max-w-7xl items-center justify-center px-5 sm:px-8 lg:px-12 text-center">
        {" "}
        <div
          key={slide._id}
          className="max-w-4xl py-24 flex flex-col items-center animate-[heroFadeIn_700ms_ease-out]"
        >
          {slide.tag && (
            <div className="inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-white">
                {slide.tag}
              </span>
            </div>
          )}

          {slide.nepaliTitle && (
            <p className="mt-7 text-lg sm:text-xl md:text-2xl font-semibold text-amber-300">
              {slide.nepaliTitle}
            </p>
          )}

          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <h2 className="mt-4 text-xl sm:text-2xl md:text-3xl font-semibold text-white/90">
              {slide.subtitle}
            </h2>
          )}

          {slide.description && (
            <p className="mt-6 max-w-2xl text-center text-base sm:text-lg leading-8 text-white/75">
              {" "}
              {slide.description}
            </p>
          )}

          {slide.tags?.length > 0 && (
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {" "}
              {slide.tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/90 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Discover Our School
              <RiArrowRightSLine className="ml-2 text-xl" />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/50 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Slide navigation */}
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-8 right-5 z-20 flex items-center gap-3 sm:right-8 lg:right-12">
            <span className="mr-2 text-sm font-semibold tabular-nums text-white/80">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-white/40">/</span>
              {String(slides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
            >
              <RiArrowLeftSLine size={25} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-slate-900"
            >
              <RiArrowRightSLine size={25} />
            </button>
          </div>

          <div className="absolute bottom-10 left-5 z-20 flex items-center gap-2 sm:left-8 lg:left-12">
            {slides.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-10 bg-amber-400"
                    : "w-5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <style>{`
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[heroFadeIn_700ms_ease-out\\] {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
