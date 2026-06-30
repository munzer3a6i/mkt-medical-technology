import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, CheckCircle2, ChevronDown, Clock, Building } from "lucide-react";
import { Product } from "../types";
import { motion } from "motion/react";

interface ContactFormProps {
  lang: "EN" | "AR";
  selectedDivision: string | null;
}

export default function ContactForm({
  lang,
  selectedDivision,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    reference: string;
    timestamp: string;
  } | null>(null);

  // Sync selected division from Services Grid click
  useEffect(() => {
    if (selectedDivision) {
      setFormData((prev) => ({ ...prev, service: selectedDivision }));
      // Scroll to contact form smoothly
      const element = document.getElementById("contact");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [selectedDivision]);

  const servicesList = lang === "EN" ? [
    "CSSD (Central Sterile Supply Department)",
    "Infection Control",
    "General Surgery & OR",
    "Endoscope Units & Maintenance",
    "Hospital Furniture & ICU",
    "Lab Diagnostics & Analytics",
    "Forensics & Security Technology",
    "Pain Management & Rehab",
  ] : [
    "قسم التعقيم المركزي (CSSD)",
    "مكافحة العدوى والتعقيم",
    "الجراحة العامة وغرف العمليات",
    "وحدات المناظير الطبية والصيانة",
    "الأثاث الطبي والعناية المركزة",
    "المختبرات والتحليل الطبي",
    "الأدلة الجنائية وتقنيات الأمن",
    "علاج الألم وإعادة التأهيل",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.org) return;

    setIsSubmitting(true);

    // Simulate clinical submittal pipeline
    setTimeout(() => {
      const randRef = `MKT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedData({
        reference: randRef,
        timestamp: new Date().toLocaleString(),
      });
      setIsSubmitting(false);
      setFormData({ name: "", org: "", service: "", message: "" });
    }, 1500);
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#001E40] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
        
        {/* Abstract background decorative medical-grid */}
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #001e40 1.2px, transparent 1.2px)",
            backgroundSize: "20px 20px"
          }}
        />

        {submittedData ? (
          /* Submission success receipt */
          <div className="text-center py-12 flex flex-col items-center justify-center gap-6 max-w-lg mx-auto relative z-10 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-sans font-bold text-2xl text-[#001E40]">
                {lang === "EN" ? "Inquiry Received Successfully" : "تم استلام الطلب بنجاح"}
              </h3>
              <p className="font-sans text-sm text-[#43474F] leading-relaxed">
                {lang === "EN"
                  ? "Thank you. Your clinical infrastructure project inquiry has been dispatched to MKT engineers in Riyadh."
                  : "شكرًا لك. تم إرسال طلبك الفني إلى قسم المهندسين المختصين في المقر الرئيسي بالرياض للبدء بالدراسة الفنية للمشروع."}
              </p>
            </div>

            {/* Official Receipt Box */}
            <div className="w-full bg-[#F2F4F6] border border-[#C3C6D1] p-6 rounded text-start flex flex-col gap-3 font-mono text-xs text-[#001E40]">
              <div className="flex justify-between border-b border-[#C3C6D1]/60 pb-2">
                <span className="font-bold">{lang === "EN" ? "REFERENCE ID" : "الرقم المرجعي"}</span>
                <span className="text-[#165DB2] font-extrabold">{submittedData.reference}</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === "EN" ? "DISPATCHED" : "توقيت الإرسال"}</span>
                <span>{submittedData.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span>{lang === "EN" ? "SLA RESPONSE" : "زمن الاستجابة"}</span>
                <span className="text-[#22C55E] font-bold">
                  {lang === "EN" ? "WITHIN 24 HOURS" : "خلال ٢٤ ساعة عمل"}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedData(null)}
              className="mt-4 font-mono text-xs font-bold text-[#165DB2] hover:text-[#001E40] transition-colors cursor-pointer"
            >
              {lang === "EN" ? "← SUBMIT ANOTHER INQUIRY" : "← تقديم طلب جديد"}
            </button>
          </div>
        ) : (
          /* Split Contact details and Form */
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
            
            {/* Left side: Riyadh Location & details */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full lg:w-1/2 flex flex-col justify-between gap-10 text-start"
            >
              <div className="flex flex-col gap-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
                  {lang === "EN" ? "GET IN TOUCH" : "تواصل معنا"}
                </span>
                <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight leading-tight">
                  {lang === "EN" 
                    ? "Let's Build a Better Standard of Care." 
                    : "لنعمل معاً على بناء مستوى رعاية أفضل."}
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
                  {lang === "EN"
                    ? "Tell us about your project or facility requirements. Our certified engineering teams will design a tailored clinical solution that matches your workflows perfectly."
                    : "أخبرنا عن مشروعك أو احتياجات منشأتك الصحية. سيقوم مهندسونا المعتمدون بتصميم حلول طبية مخصصة توافق طريقتكم في العمل بدقة."}
                </p>
              </div>

              {/* Direct corporate details */}
              <div className="flex flex-col gap-4 pt-6 border-t border-[#ECEEF0]">
                {/* Riyadh location */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#001E40]/5 rounded flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#165DB2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold text-[#001E40]">
                      {lang === "EN" ? "RIYADH HEADQUARTERS" : "المقر الرئيسي في الرياض"}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-[#43474F]">
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#165DB2] transition-colors"
                      >
                        {lang === "EN"
                          ? "Al-Takhassusi Branch Street, Ar-Rahmaniyah, Riyadh 12341"
                          : "شارع التخصصي الفرعي، الرحمانية، الرياض 12341"}
                      </a>
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#001E40]/5 rounded flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#165DB2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold text-[#001E40]">
                      {lang === "EN" ? "CLINICAL HOTLINE" : "الخط السريري الفني"}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-[#43474F] font-semibold">
                      <a href="tel:+966564433288" className="hover:text-[#165DB2] transition-colors">
                        +966 56 443 3288
                      </a>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#001E40]/5 rounded flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#165DB2]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] font-bold text-[#001E40]">
                      {lang === "EN" ? "DIRECT ENQUIRIES" : "البريد الإلكتروني المباشر"}
                    </span>
                    <span className="font-sans text-xs sm:text-sm text-[#165DB2] hover:underline">
                      <a href="mailto:info@mkt.sa">
                        info@mkt.sa
                      </a>
                    </span>
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right side: Form element */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-start">
                
                {/* Name and Org row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] flex items-center gap-1 ${lang === "EN" ? "font-mono text-[10px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {lang === "AR" && <span className="text-red-500">*</span>}
                      {lang === "EN" ? "FULL NAME" : "الاسم الكامل"}
                      {lang === "EN" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "EN" ? "e.g. Eng. Khalid Al-Otaibi" : "مثال: م. خالد العتيبي"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2] placeholder:text-[#9CA3AF]"
                      id="form-input-name"
                    />
                  </div>

                  {/* Organization */}
                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] flex items-center gap-1 ${lang === "EN" ? "font-mono text-[10px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {lang === "AR" && <span className="text-red-500">*</span>}
                      {lang === "EN" ? "ORGANIZATION" : "الجهة / المستشفى"}
                      {lang === "EN" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "EN" ? "e.g. King Fahad Hospital" : "مثال: مستشفى الملك فهد"}
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2] placeholder:text-[#9CA3AF]"
                      id="form-input-org"
                    />
                  </div>
                </div>

                {/* Service of Interest */}
                <div className="flex flex-col gap-2 relative">
                  <label className={`font-bold text-[#43474F] ${lang === "EN" ? "font-mono text-[10px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                    {lang === "EN" ? "SERVICE OF INTEREST" : "مجال الاستفسار والاهتمام"}
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2] appearance-none cursor-pointer"
                      id="form-input-service"
                    >
                      <option value="">{lang === "EN" ? "Select a service division..." : "اختر القسم المعني..."}</option>
                      {servicesList.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474F] pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className={`font-bold text-[#43474F] ${lang === "EN" ? "font-mono text-[10px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                    {lang === "EN" ? "MESSAGE" : "تفاصيل طلب التقييم"}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      lang === "EN"
                        ? "Please detail physical space requirements, equipment lists or project constraints..."
                        : "يرجى كتابة تفاصيل المساحة الطبية، الأجهزة الطبية المطلوبة، أو مواعيد تسليم المشروع..."
                    }
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2] placeholder:text-[#9CA3AF]"
                    id="form-input-message"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="form-submit-btn"
                  className="relative overflow-hidden group w-full bg-[#001E40] text-white font-sans font-bold text-sm tracking-[1.6px] uppercase py-4 rounded-sm cursor-pointer shadow-md disabled:opacity-50 text-center flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{lang === "EN" ? "DISPATCHING..." : "جاري الإرسال الفني..."}</span>
                      </>
                    ) : (
                      <span>{lang === "EN" ? "SUBMIT ENGINEERING INQUIRY" : "إرسال طلب التقييم الفني"}</span>
                    )}
                  </span>
                </button>

              </form>
            </motion.div>

          </div>
        )}

      </div>
    </motion.section>
  );
}
