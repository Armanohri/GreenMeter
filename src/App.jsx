import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserHome from "./pages/UserHome";

import { animateOnScroll } from "./scrollAnimation";
import "./App.css";

export default function App() {

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  // Apply dark mode before load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // Animations & navbar behavior
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
      <div className="scroll-progress"></div>

      {/* Hide main navbar on dashboard */}
      {!isDashboard && <Navbar />}

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <section id="home" className="fade-in"><Hero /></section>
              <section className="fade-up"><Stats /></section>
              <section id="features" className="fade-up"><Features /></section>
              <section id="howitworks" className="fade-up"><HowItWorks /></section>
              <section id="blog" className="fade-in"><Footer /></section>
            </>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<UserHome />} />

      </Routes>
    </>
  );
}
