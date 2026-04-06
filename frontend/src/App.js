import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import AnimatedBackground from "./components/AnimatedBackground";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EventsSection from "./components/EventsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import ProjectCasePage from "./pages/projects/ProjectCasePage";
import UIKitPage from "./pages/UIKitPage";
import StyleGuidePage from "./pages/StyleGuidePage";
import GraphicsElementsPage from "./pages/GraphicsElementsPage";
import TypographyGuidePage from "./pages/TypographyGuidePage";

const getRouterBasename = () => {
  const rawPublicUrl = process.env.PUBLIC_URL;
  if (rawPublicUrl && rawPublicUrl !== "." && rawPublicUrl !== "./") {
    return rawPublicUrl.replace(/\/$/, "");
  }
  return "/";
};

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  React.useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      // Небольшая задержка нужна, чтобы секция уже была в DOM после рендера страницы.
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }, 0);

      return () => clearTimeout(timer);
    }

    if (pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
};

const PortfolioPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05030f] text-white font-sans">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <EventsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={getRouterBasename()}>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/projects/:slug" element={<ProjectCasePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/ui-kit" element={<UIKitPage />} />
          <Route path="/style-guide" element={<StyleGuidePage />} />
          <Route path="/graphics-elements" element={<GraphicsElementsPage />} />
          <Route path="/typography-guide" element={<TypographyGuidePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
