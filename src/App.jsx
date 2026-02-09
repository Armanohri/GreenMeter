import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import { animateOnScroll } from "./scrollAnimation";
import "./App.css";

export default function App() {
  useEffect(() => {
    // ---------------------------
    // 1. Fade-in + Fade-up animations
    // ---------------------------
    animateOnScroll();

    // ---------------------------
    // 2. Sticky Navbar Scroll Effect
    // ---------------------------
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // ---------------------------
    // 3. Parallax Hero Background
    // ---------------------------
    const parallax = () => {
      const hero = document.querySelector(".hero");
      if (hero) {
        let offset = window.pageYOffset;
        hero.style.backgroundPositionY = offset * 0.3 + "px";
      }
    };

    window.addEventListener("scroll", parallax);

    // ---------------------------
    // 4. Hero Image Slide-In Animation
    // ---------------------------
    const heroImg = document.querySelector(".hero-img");

    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && heroImg) {
          heroImg.classList.add("show");
          imgObserver.disconnect(); // Only animate once
        }
      });
    });

    if (heroImg) imgObserver.observe(heroImg);

    // ---------------------------
    // 5. Scroll Progress Bar
    // ---------------------------
    const progressBar = document.querySelector(".scroll-progress");

    const updateProgressBar = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    };

    window.addEventListener("scroll", updateProgressBar);

    // ---------------------------
    // Cleanup Listeners
    // ---------------------------
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", parallax);
      window.removeEventListener("scroll", updateProgressBar);
    };
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <div className="scroll-progress"></div>

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="fade-in">
        <Hero />
      </div>

      {/* STATS */}
      <div className="fade-up">
        <Stats />
      </div>

      {/* FEATURES */}
      <div className="fade-up">
        <Features />
      </div>

      {/* HOW IT WORKS */}
      <div className="fade-up">
        <HowItWorks />
      </div>

      {/* FOOTER */}
      <div className="fade-in">
        <Footer />
      </div>
    </>
  );
}
