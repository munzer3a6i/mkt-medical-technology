/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrustGrid from "./components/TrustGrid";
import ServicesGrid from "./components/ServicesGrid";
import EquipmentShop from "./components/EquipmentShop";
import AboutStory from "./components/AboutStory";
import WorkProcess from "./components/WorkProcess";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ServicesPage from "./components/ServicesPage";
import EquipmentPage from "./components/EquipmentPage";
import ProcessPage from "./components/ProcessPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PartnersPage from "./components/PartnersPage";
import BackToTop from "./components/BackToTop";
import { Product } from "./types";

export default function App() {
  const [lang, setLang] = useState<"EN" | "AR">("EN");
  const [page, setPage] = useState<"home" | "services" | "equipment" | "process" | "about" | "partners" | "contact">("home");
  const [currentSection, setCurrentSection] = useState("home");
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);

  // Sync HTML direction with selected language (LTR/RTL support)
  useEffect(() => {
    const html = document.documentElement;
    if (lang === "AR") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      html.style.fontFamily = "'Inter', 'IBM Plex Sans Arabic', sans-serif";
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      html.style.fontFamily = "'Inter', sans-serif";
    }
  }, [lang]);

  // Handle active section scrolling highlight based on Intersection Observer
  useEffect(() => {
    if (page !== "home") return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ["home", "services", "equipment", "about", "process", "partners", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [page]);

  const handleSectionScroll = (id: string) => {
    if (id === "services") {
      setPage("services");
      setCurrentSection("services");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "equipment") {
      setPage("equipment");
      setCurrentSection("equipment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "process") {
      setPage("process");
      setCurrentSection("process");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "about") {
      setPage("about");
      setCurrentSection("about");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "partners") {
      setPage("partners");
      setCurrentSection("partners");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "contact") {
      setPage("contact");
      setCurrentSection("contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setPage("home");
      setCurrentSection(id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const handleInquireProduct = (productName: string) => {
    setSelectedDivision(productName);
    handleSectionScroll("contact");
  };

  const handleSelectDivisionFromCard = (divisionTitle: string) => {
    setSelectedDivision(divisionTitle);
    handleSectionScroll("contact");
  };

  const handleOpenAssessmentRequest = () => {
    setSelectedDivision("General Surgery & OR");
    handleSectionScroll("contact");
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col justify-between relative overflow-x-hidden font-sans antialiased text-gray-900 select-none">
      
      {/* Header */}
      <Header
        currentSection={currentSection}
        onSectionClick={handleSectionScroll}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Sections */}
      <main className="flex-1 w-full flex flex-col relative">
        <AnimatePresence mode="wait">
          {page === "services" ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <ServicesPage
                lang={lang}
                onInquire={(divTitle) => {
                  setSelectedDivision(divTitle);
                  handleSectionScroll("contact");
                }}
                onNavigateHomeSection={handleSectionScroll}
              />
            </motion.div>
          ) : page === "equipment" ? (
            <motion.div
              key="equipment"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <EquipmentPage
                lang={lang}
                onNavigateHomeSection={handleSectionScroll}
                onInquireProduct={handleInquireProduct}
              />
            </motion.div>
          ) : page === "process" ? (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <ProcessPage
                lang={lang}
                onNavigateHomeSection={handleSectionScroll}
              />
            </motion.div>
          ) : page === "about" ? (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <AboutPage
                lang={lang}
                onNavigateHomeSection={handleSectionScroll}
              />
            </motion.div>
          ) : page === "partners" ? (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <PartnersPage
                lang={lang}
                onNavigateHomeSection={handleSectionScroll}
              />
            </motion.div>
          ) : page === "contact" ? (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              <ContactPage
                lang={lang}
                selectedDivision={selectedDivision}
                onNavigateHomeSection={handleSectionScroll}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full flex-1 flex flex-col"
            >
              {/* Hero */}
              <Hero
                lang={lang}
                onActionClick={handleSectionScroll}
                onOpenAssessment={handleOpenAssessmentRequest}
              />

              {/* Strategic Performance Grid */}
              <TrustGrid lang={lang} />

              {/* Specialized Services Divisions */}
              <ServicesGrid 
                lang={lang} 
                onSelectDivision={handleSelectDivisionFromCard} 
                onExploreDetailed={() => handleSectionScroll("services")}
              />

              {/* Catalog & Equipment Shop */}
              <EquipmentShop
                lang={lang}
                onInquireProduct={handleInquireProduct}
                onExploreCatalog={() => handleSectionScroll("equipment")}
              />

              {/* Corporate Profile (About/Mission/Vision) */}
              <AboutStory 
                lang={lang} 
                onExploreDetailed={() => handleSectionScroll("about")}
              />

              {/* Work Process Pipeline */}
              <WorkProcess 
                lang={lang} 
                onExploreDetailed={() => handleSectionScroll("process")}
              />

              {/* Interactive Contact & Inquiry Form */}
              <ContactForm
                lang={lang}
                selectedDivision={selectedDivision}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer 
        lang={lang} 
        onSectionClick={handleSectionScroll} 
      />

      {/* Floating Back to Top Button */}
      <BackToTop />

    </div>
  );
}

