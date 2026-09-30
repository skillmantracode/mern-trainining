import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiArrowRightLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

const slides = [
  {
    tag: "EXCELLENCE IN EDUCATION",
    nepaliTitle: "श्री सिद्धबाबा माध्यमिक विद्यालय",
    title: "Shree Siddhababa Secondary School",
    subtitle: "A Modern Learning Environment",
    description:
      "Empowering students with knowledge, creativity, and practical skills for the future.",
    tags: ["CEHRD Affiliated", "Computer Engineering", "Hotel Management"],
    bgImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop",
  },
  {
    tag: "ADMISSION OPEN · 2026 INTAKE",
    nepaliTitle: "ज्ञान · चरित्र · नेतृत्व",
    title: "Future-Ready Academic Programs",
    subtitle: "Knowledge · Character · Leadership",
    description:
      "A culture of care preparing students from Grade 1 to Grade 12 for top universities worldwide.",
    tags: ["Science & Tech", "Modern Labs", "Sports Complex"],
    bgImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop",
  },
  {
    tag: "PRACTICAL SKILLS & INNOVATION",
    nepaliTitle: "प्रविधि र नवीनता",
    title: "Hands-on Technical Training",
    subtitle: "Building Tomorrow's Innovators Today",
    description:
      "Equipping young minds with state-of-the-art computer labs, technical workshops, and real-world exposure.",
    tags: ["Tech Workshops", "Digital Campus", "Career Prep"],
    bgImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920&auto=format&fit=crop",
  },
];

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play interval for changing background images and text
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Images with Fade Transition */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          } transition-transform duration-10000`}
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Dark Overlay with Soft Glow (Matching the Reference Image Glow) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/70 to-slate-950/90 backdrop-brightness-90" />
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none" />

      {/* Main Content (Centered Dynamic Text) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Top Tag / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-6 transition-all duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          {slides[currentSlide].tag}
        </div>

        {/* Nepali Sub-header */}
        <p className="text-slate-300 font-medium text-lg sm:text-xl tracking-wide mb-2 transition-all duration-500">
          {slides[currentSlide].nepaliTitle}
        </p>

        {/* Dynamic Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl transition-all duration-500">
          {slides[currentSlide].title}
        </h1>

        {/* Dynamic Subtitle */}
        <h2 className="mt-3 text-lg sm:text-2xl font-semibold text-amber-400 transition-all duration-500">
          {slides[currentSlide].subtitle}
        </h2>

        {/* Dynamic Description */}
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed transition-all duration-500">
          {slides[currentSlide].description}
        </p>

        {/* Feature Tags / Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6">
          {slides[currentSlide].tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/10 text-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/admission"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm"
          >
            Apply for Admission
            <RiArrowRightLine className="text-lg" />
          </Link>
          <Link
            to="/programs"
            className="inline-flex items-center justify-center bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-full backdrop-blur-md transition-all text-sm"
          >
            Explore Programs
          </Link>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 transition-all hidden sm:block"
        aria-label="Previous Slide"
      >
        <RiArrowLeftSLine className="text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/40 hover:bg-slate-900/80 text-white backdrop-blur-md border border-white/10 transition-all hidden sm:block"
        aria-label="Next Slide"
      >
        <RiArrowRightSLine className="text-2xl" />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-8 bg-amber-400"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSection;