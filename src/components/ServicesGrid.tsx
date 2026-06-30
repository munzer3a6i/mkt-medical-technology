import { useState } from "react";
import { useServices } from "../hooks/useServices";
import * as Icons from "./Icons";
import { motion, AnimatePresence } from "motion/react";

interface ServicesGridProps {
  lang: "EN" | "AR";
  onSelectDivision: (divisionTitle: string) => void;
  onExploreDetailed: () => void;
}

export default function ServicesGrid({ lang, onSelectDivision, onExploreDetailed }: ServicesGridProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { services, loading } = useServices();

  const filteredDivisions = services.filter((div) => {
    const q = searchQuery.toLowerCase();
    const title = div.title.toLowerCase();
    const titleAr = (div.titleAr || "").toLowerCase();
    const desc = div.description.toLowerCase();
    const descAr = (div.descriptionAr || "").toLowerCase();
    return title.includes(q) || titleAr.includes(q) || desc.includes(q) || descAr.includes(q);
  });

  // Render dynamic icon based on string name
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-white" />;
    }
    return <Icons.Activity className="w-5 h-5 text-white" />;
  };

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#F7F9FB] border-b border-[#C3C6D1] py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
            {lang === "EN" ? "CORE DIVISIONS" : "أقسام التخصص الفني"}
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight">
            {lang === "EN" 
              ? "Clinical Technical Divisions" 
              : "الأقسام الفنية للرعاية السريرية"}
          </h2>
          <p className="max-w-2xl font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
            {lang === "EN"
              ? "MKT operates eight specialized clinical divisions, matching international ISO standards with expert on-site lifecycle support."
              : "ندير ثمانية أقسام تخصصية متكاملة لربط المنشآت الطبية السعودية بأرقى التقنيات العالمية المطابقة لمواصفات الآيزو والدعم الفني."}
          </p>

          {/* Quick Division Search */}
          <div className="w-full max-w-md mt-4">
            <input
              type="text"
              placeholder={lang === "EN" ? "Search divisions (e.g. CSSD)..." : "بحث في الأقسام (مثال: تعقيم)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#C3C6D1] rounded px-4 py-2 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2]"
              id="division-search-input"
            />
          </div>
        </div>

        {/* Divisions Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
          {filteredDivisions.map((division, index) => {
            const isExpanded = selectedId === division.id;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={division.id}
                id={`division-card-${division.id}`}
                className={`box-border bg-white border border-[#C3C6D1] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative rounded-sm ${
                  isExpanded 
                    ? "ring-2 ring-[#165DB2] shadow-md scale-[1.02] z-10" 
                    : "hover:shadow-md hover:scale-[1.01]"
                }`}
              >
                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 bg-[#003366] flex items-center justify-center rounded-[2px] mb-6">
                    {renderIcon(division.iconName)}
                  </div>

                  {/* Title (Heading 3) */}
                  <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#001E40] mb-3">
                    {lang === "EN" ? division.title : (division.titleAr || division.title)}
                  </h3>

                  {/* Short Description */}
                  <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed mb-4">
                    {lang === "EN" ? division.description : (division.descriptionAr || division.description)}
                  </p>

                  {/* Interactive expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#ECEEF0] flex flex-col gap-4 text-start animate-fadeIn">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#165DB2] tracking-wider block mb-1">
                          {lang === "EN" ? "CAPABILITIES" : "القدرات الفنية"}
                        </span>
                        <p className="font-sans text-xs text-[#43474F] leading-relaxed">
                          {lang === "EN" ? division.longDescription : (division.longDescriptionAr || division.longDescription)}
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#165DB2] tracking-wider block mb-1">
                          {lang === "EN" ? "KEY CLIENTS & PROJECTS" : "المشاريع الرئيسية"}
                        </span>
                        <ul className="list-disc list-inside font-sans text-[11px] text-[#43474F] flex flex-col gap-0.5">
                          {(lang === "EN" ? division.keyProjects : (division.keyProjectsAr || division.keyProjects)).map((p, i) => (
                            <li key={i}>{p}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#165DB2] tracking-wider block mb-1">
                          {lang === "EN" ? "STANDARDS" : "الشهادات والمعايير"}
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {division.certifications.map((c, i) => (
                            <span
                              key={i}
                              className="bg-[#ECEEF0] text-[#001E40] text-[9px] font-mono font-medium px-2 py-0.5 rounded"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card CTA Actions */}
                <div className="mt-6 pt-4 border-t border-[#ECEEF0] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => setSelectedId(isExpanded ? null : division.id)}
                    className="text-start font-mono text-xs font-bold text-[#165DB2] hover:text-[#001E40] transition-colors focus:outline-none cursor-pointer"
                    id={`division-toggle-${division.id}`}
                  >
                    {isExpanded 
                      ? (lang === "EN" ? "▲ CLOSE INFO" : "▲ إغلاق التفاصيل") 
                      : (lang === "EN" ? "▼ EXPAND CAPABILITIES" : "▼ استعراض القدرات")}
                  </button>

                  <button
                    onClick={() => onSelectDivision(division.title)}
                    className="relative overflow-hidden group bg-[#001E40] text-white font-sans font-bold text-[10px] px-3 py-1.5 rounded-sm text-center cursor-pointer uppercase tracking-wider"
                    id={`division-inquiry-${division.id}`}
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                    <span className="relative z-10 block">
                      {lang === "EN" ? "INQUIRE" : "استفسار"}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        {/* Explore Detailed Services Page Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onExploreDetailed}
            id="explore-detailed-services-btn"
            className="relative overflow-hidden group flex items-center gap-2 bg-[#165DB2] text-white font-mono text-xs font-bold px-8 py-4 rounded shadow hover:shadow-md cursor-pointer uppercase tracking-wider"
          >
            <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2">
              <span>{lang === "EN" ? "Explore Detailed Services Overview" : "استعراض دليل الخدمات التفصيلي"}</span>
              <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180">➔</span>
            </span>
          </button>
        </div>

      </div>
    </motion.section>
  );
}
