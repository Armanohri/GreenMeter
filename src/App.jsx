import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";

import { animateOnScroll } from "./scrollAnimation";
import "./App.css";

export default function App() {

  // 🔥 Apply dark mode BEFORE page loads
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    animateOnScroll();

    const navbar = document.querySelector(".navbar");

    const handleScroll = () => {
      navbar?.classList.toggle("scrolled", window.scrollY > 30);
    };

    const progressBar = document.querySelector(".scroll-progress");

    const updateProgressBar = () => {
      if (!progressBar) return;
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = (scrollTop / height) * 100 + "%";
    };

    const parallax = () => {
      const hero = document.querySelector(".hero");
      if (hero)
        hero.style.backgroundPositionY = window.pageYOffset * 0.3 + "px";
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", updateProgressBar);
    window.addEventListener("scroll", parallax);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", updateProgressBar);
      window.removeEventListener("scroll", parallax);
    };
  }, []);

  return (
    <>
      {/* Only ONE progress bar */}
      <div className="scroll-progress"></div>

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="fade-in"><Hero /></div>
              <div className="fade-up"><Stats /></div>
              <div className="fade-up"><Features /></div>
              <div className="fade-up"><HowItWorks /></div>
              <div className="fade-in"><Footer /></div>
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}
