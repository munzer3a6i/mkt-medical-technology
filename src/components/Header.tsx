import { useState } from "react";
import { Globe, Menu, X, ArrowRight, Lock, User, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoNavbar from "@/assets/MKT logo header.png";

interface HeaderProps {
  currentSection: string;
  onSectionClick: (sectionId: string) => void;
  lang: "EN" | "AR";
  onToggleLang: () => void;
}

export default function Header({
  currentSection,
  onSectionClick,
  lang,
  onToggleLang,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", labelEn: "HOME", labelAr: "الرئيسية" },
    { id: "services", labelEn: "SERVICES", labelAr: "الأقسام" },
    { id: "equipment", labelEn: "EQUIPMENT", labelAr: "المعدات" },
    { id: "about", labelEn: "ABOUT US", labelAr: "من نحن" },
    { id: "partners", labelEn: "PARTNERS", labelAr: "الشركاء" },
    { id: "process", labelEn: "PROCESS", labelAr: "الآلية" },
  ];

  const handleNavClick = (id: string) => {
    onSectionClick(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white border-b border-[#C3C6D1] shadow-sm backdrop-blur-md">
      <div className="w-full h-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer text-start"
          id="nav-logo-btn"
        >
          <img src={logoNavbar} alt="MKT Solutions" className="h-16 w-auto object-contain scale-[3] origin-left" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-link-${item.id}`}
                className={`font-mono text-xs tracking-wider transition-all duration-200 py-1 border-b-2 cursor-pointer font-medium ${
                  isActive
                    ? "border-[#165DB2] text-[#165DB2] font-bold"
                    : "border-transparent text-[#43474F] hover:text-[#165DB2]"
                }`}
              >
                {lang === "EN" ? item.labelEn : item.labelAr}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            id="lang-toggle-btn"
            className="p-2 text-[#43474F] hover:text-[#165DB2] transition-colors flex items-center gap-1.5 text-xs font-mono font-medium cursor-pointer"
            title={lang === "EN" ? "Switch to Arabic" : "تحويل إلى الإنجليزية"}
          >
            <Globe className="w-4.5 h-4.5" />
            <span>{lang === "EN" ? "العربية" : "EN"}</span>
          </button>

          {/* Contact Us Button */}
          <button
            onClick={() => handleNavClick("contact")}
            id="header-contact-btn"
            className="relative overflow-hidden group bg-[#001E40] text-white border border-transparent rounded px-4 py-2 font-mono text-xs tracking-wider font-semibold cursor-pointer flex items-center gap-2 uppercase"
          >
            <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 transform rtl:rotate-180" />
              <span>{lang === "EN" ? "Contact Us" : "اتصل بنا"}</span>
            </span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">

          <button
            onClick={onToggleLang}
            className="p-1.5 text-xs font-mono font-medium text-[#43474F] border border-[#C3C6D1] rounded"
            id="mobile-lang-toggle"
          >
            {lang === "EN" ? "عربي" : "EN"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#001E40] hover:text-[#165DB2] transition-colors"
            id="mobile-menu-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-20 bg-white border-b border-[#C3C6D1] shadow-lg py-4 px-6 z-40"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-start font-mono py-2 text-sm tracking-wide transition-colors ${
                      isActive
                        ? "text-[#165DB2] font-bold ps-2 border-s-2 border-[#165DB2]"
                        : "text-[#43474F] hover:text-[#165DB2]"
                    }`}
                  >
                    {lang === "EN" ? item.labelEn : item.labelAr}
                  </button>
                );
              })}
              <div className="border-t border-[#ECEEF0] pt-4 mt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    handleNavClick("contact");
                  }}
                  className="relative overflow-hidden group w-full bg-[#001E40] text-white text-center py-2.5 rounded font-mono text-xs tracking-wider font-semibold flex items-center justify-center gap-2 uppercase cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <ArrowRight className="w-4 h-4 transform rtl:rotate-180" />
                    <span>{lang === "EN" ? "Contact Us" : "اتصل بنا"}</span>
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
