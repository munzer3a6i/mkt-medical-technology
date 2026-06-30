import React from "react";
import { motion } from "motion/react";
import { useServices } from "../hooks/useServices";
import * as Icons from "./Icons";
import { 
  Check, 
  ArrowRight,
  FileCheck,
  ShieldAlert,
  Download,
  PhoneCall,
  Activity
} from "lucide-react";

interface ServicesPageProps {
  lang: "EN" | "AR";
  onInquire: (divisionName: string) => void;
  onNavigateHomeSection: (sectionId: string) => void;
}

export default function ServicesPage({ lang, onInquire, onNavigateHomeSection }: ServicesPageProps) {
  const { services, loading } = useServices();

  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5" />;
    }
    return <Activity className="w-5 h-5" />;
  };

  const tableRows = [
    {
      div: lang === "EN" ? "Central Sterilization (CSSD)" : "التعقيم المركزي",
      std: "ISO 13485:2016 & EN 285",
      recert: lang === "EN" ? "6 Months Interval" : "كل ٦ أشهر",
      status: lang === "EN" ? "ACTIVE" : "نشط",
      color: "teal"
    },
    {
      div: lang === "EN" ? "Infection Control Systems" : "أنظمة مكافحة العدوى",
      std: "ISO 9001:2015 & AAMI ST79",
      recert: lang === "EN" ? "12 Months Interval" : "كل ١٢ شهراً",
      status: lang === "EN" ? "ACTIVE" : "نشط",
      color: "blue"
    },
    {
      div: lang === "EN" ? "General Surgery Suites" : "أجنحة الجراحة العامة",
      std: "EN 60601 Electrical Safety",
      recert: lang === "EN" ? "12 Months Interval" : "كل ١٢ شهراً",
      status: lang === "EN" ? "ACTIVE" : "نشط",
      color: "teal"
    },
    {
      div: lang === "EN" ? "Endoscope Processing" : "معالجة المناظير الطبية",
      std: "ISO 13485 & CE Mark",
      recert: lang === "EN" ? "6 Months Interval" : "كل ٦ أشهر",
      status: lang === "EN" ? "ACTIVE" : "نشط",
      color: "blue"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#F7F9FB] text-start"
    >
      
      {/* 1. Header - Hero Section */}
      <section className="bg-[#001E40] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 text-start">
          
          {/* Badge */}
          <div className="inline-flex self-start bg-[#7FF5F4] px-4 py-1.5 rounded-full text-xs font-mono font-bold text-[#002020] tracking-wider uppercase">
            {lang === "EN" ? "SERVICES OVERVIEW" : "نظرة عامة على الخدمات"}
          </div>

          {/* Heading 1 */}
          <h1 className="font-sans font-bold text-3xl sm:text-5xl lg:text-[44px] leading-tight text-white tracking-tight max-w-4xl">
            {lang === "EN" 
              ? "Expert Solutions for Modern Healthcare & Security."
              : "حلول هندسية متخصصة للرعاية الصحية الحديثة والأمن الوطني."}
          </h1>

          {/* Paragraph */}
          <p className="font-sans text-base sm:text-lg text-[#A7C8FF] leading-relaxed max-w-3xl">
            {lang === "EN"
              ? "Modern Knowledge Trading Co. (MKT) provides mission-critical technology and infrastructure for high-stakes clinical and forensic environments."
              : "توفر شركة تجارة المعرفة الحديثة (MKT) التقنيات والخدمات والحلول الفنية للأقسام الحساسة وغرف العمليات والمختبرات الجنائية."}
          </p>

        </div>
      </section>

      {/* 2. Services Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Uniform Grid layout */}
        <motion.div 
          initial="hidden"
          animate="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading services...</div>
          ) : services.map((card) => (
            <motion.div
              key={card.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } }}
              onClick={() => onInquire(card.title)}
              className="bg-white border border-[#C3C6D1] rounded-lg p-6 sm:p-8 shadow-sm flex flex-col justify-between text-start cursor-pointer hover:border-[#165DB2] hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-10 h-10 bg-[#165DB2] text-white flex items-center justify-center rounded mb-4">
                  {renderIcon(card.iconName)}
                </div>
                <h3 className="font-sans font-bold text-lg text-[#001E40] mb-3 group-hover:text-[#165DB2] transition-colors">
                  {lang === "EN" ? card.title : (card.titleAr || card.title)}
                </h3>
                <p className="font-sans text-sm text-[#43474F] leading-relaxed">
                  {lang === "EN" ? card.description : (card.descriptionAr || card.description)}
                </p>
              </div>

              {card.badgeLabel && (
                <div className="mt-6 pt-4 border-t border-[#ECEEF0] text-[11px] font-mono font-bold text-[#165DB2] uppercase">
                  {lang === "EN" ? card.badgeLabel : (card.badgeLabelAr || card.badgeLabel)}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </section>

      {/* 3. Section - Technical Standards Table */}
      <section className="bg-[#F7F9FB] border-t border-b border-[#C3C6D1] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 text-start">
          
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-bold text-2xl text-[#001E40] tracking-tight">
              {lang === "EN" ? "Compliance & Performance Matrix" : "مصفوفة الامتثال والأداء الفني"}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
              {lang === "EN"
                ? "All MKT services adhere to ISO 13485 and global medical device standards, ensuring precision and reliability."
                : "تتوافق جميع خدمات شركة إم كي تي مع متطلبات شهادات الآيزو ومعايير الهيئة العامة للغذاء والدواء لضمان الدقة والأمان."}
            </p>
          </div>

          {/* Compliance Matrix Table */}
          <div className="w-full border border-[#C3C6D1] rounded overflow-hidden shadow-sm bg-white overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse">
              <thead>
                <tr className="bg-[#001E40] text-white">
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "DIVISION" : "القسم الفني"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "COMPLIANCE STANDARD" : "معيار الامتثال الدولي"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "RE-CERTIFICATION" : "دورة التدقيق الوقائي"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start">
                    {lang === "EN" ? "SFDA STATUS" : "ترخيص الغذاء والدواء"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C3C6D1]/60">
                {tableRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"}>
                    <td className="px-6 py-4 font-sans font-bold text-sm text-[#001E40] border-e border-[#C3C6D1]/40">
                      {row.div}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs sm:text-sm text-[#43474F] border-e border-[#C3C6D1]/40">
                      {row.std}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs sm:text-sm text-[#43474F] border-e border-[#C3C6D1]/40">
                      {row.recert}
                    </td>
                    <td className="px-6 py-4">
                      {row.color === "teal" ? (
                        <span className="inline-flex items-center bg-[#25ACAC]/10 border border-[#25ACAC]/30 text-[#25ACAC] text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                          {row.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-[#003366] text-white text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                          {row.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 4. CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#6CA3FD] text-[#003874] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-xl flex flex-col items-center text-center gap-6 relative overflow-hidden">
          
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#003874]">
              {lang === "EN" ? "Ready to Upgrade Your Facility Infrastructure?" : "جاهز لترقية البنية التحتية لمنشأتك الصحية؟"}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#003874]/80 max-w-2xl leading-relaxed">
              {lang === "EN"
                ? "All MKT clinical layouts, sterile workflow designs, and physical footprints are crafted by certified engineers under standard ISO frameworks."
                : "يتم تخطيط وتصميم جميع الهياكل التنظيمية وأقسام التعقيم وسير العمل الطبي من قبل مهندسينا المعتمدين دولياً."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            <button
              onClick={() => onNavigateHomeSection("contact")}
              className="relative overflow-hidden group bg-[#001E40] text-white font-mono text-xs font-bold px-8 py-4 rounded-sm shadow-md tracking-wider uppercase cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10">
                {lang === "EN" ? "REQUEST ENGINEERING PLAN" : "طلب مخطط هندسي متكامل"}
              </span>
            </button>

            <button
              onClick={() => onNavigateHomeSection("equipment")}
              className="relative overflow-hidden group bg-white/20 border border-[#003874]/20 backdrop-blur-sm text-[#003874] font-mono text-xs font-bold px-8 py-4 rounded-sm tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 w-full h-full bg-white/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                <span>{lang === "EN" ? "DOWNLOAD PORTFOLIO" : "تحميل ملف سابقة الأعمال"}</span>
              </span>
            </button>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
