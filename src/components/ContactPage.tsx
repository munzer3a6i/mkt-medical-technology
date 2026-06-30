import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ShieldAlert, 
  Building2, 
  FileText,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Product } from "../types";

interface ContactPageProps {
  lang: "EN" | "AR";
  onNavigateHomeSection: (sectionId: string) => void;
  selectedDivision?: string | null;
}

export default function ContactPage({ 
  lang, 
  onNavigateHomeSection,
  selectedDivision
}: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    org: "",
    email: "",
    service: "Modern Trading Systems",
    requirements: "",
    agreed: false
  });

  // Sync selected division from product clicks
  useEffect(() => {
    if (selectedDivision) {
      setFormData((prev) => ({
        ...prev,
        service: selectedDivision,
        requirements: lang === "EN" 
          ? `We are interested in receiving a clinical assessment / quotation for: ${selectedDivision}. Please contact us.`
          : `نحن مهتمون بالحصول على تقييم وعرض سعر فني لـ: ${selectedDivision}. يرجى التواصل معنا.`
      }));
    }
  }, [selectedDivision, lang]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    reference: string;
    timestamp: string;
  } | null>(null);

  const labels = {
    tag: lang === "EN" ? "SECURE CHANNELS" : "قنوات الاتصال الآمنة",
    title: lang === "EN" ? "Contact Us" : "اتصل بنا",
    desc: lang === "EN" 
      ? "Secure communication for enterprise trading and knowledge management. Connect with our experts in Riyadh."
      : "اتصال موثوق وآمن للتبادل المعرفي والتجاري المؤسسي. تواصل مع خبرائنا ومستشارينا الفنيين في مدينة الرياض.",
    
    // Contact Info Left Card
    infoCardTitle: lang === "EN" ? "Corporate Headquarters" : "المقر الرئيسي للمجموعة",
    addrTitle: lang === "EN" ? "TECHNICAL HEADQUARTERS" : "المقر الفني الرئيسي",
    addrDesc: lang === "EN" 
      ? "Al-Takhassusi Branch Street, Ar-Rahmaniyah, Riyadh 12341" 
      : "شارع التخصصي الفرعي، الرحمانية، الرياض 12341",
    phoneTitle: lang === "EN" ? "CLINICAL HOTLINE" : "الخط السريري الفني المباشر",
    phoneDesc: "+966 56 443 3288",
    emailTitle: lang === "EN" ? "SECURE EMAIL" : "البريد الإلكتروني المشفر",
    emailDesc: "info@mkt.sa",
    mapPinLabel: lang === "EN" ? "MKT CORPORATE HQ" : "المقر الرئيسي للشركة MKT",

    // Form Right Card
    formTitle: lang === "EN" ? "Request a Consultation" : "طلب استشارة فنية متخصصة",
    formDesc: lang === "EN"
      ? "Complete the form below for a formal technical assessment of your requirements."
      : "يرجى تعبئة النموذج أدناه للحصول على تقييم فني ورسمي شامل لمتطلبات مشروعكم.",
    labelName: lang === "EN" ? "FULL NAME" : "الاسم الكامل",
    labelOrg: lang === "EN" ? "ORGANIZATION" : "الجهة / المستشفى",
    labelEmail: lang === "EN" ? "BUSINESS EMAIL" : "البريد الإلكتروني للعمل",
    labelInterest: lang === "EN" ? "SERVICE INTEREST" : "مجال الاهتمام الفني",
    labelReqs: lang === "EN" ? "TECHNICAL REQUIREMENTS" : "المتطلبات الفنية والمساحة",
    placeholderReqs: lang === "EN" 
      ? "Describe your project scope, sterile workflow volume or equipment lists..." 
      : "صف نطاق المشروع، حجم العمل المعقم المطلوب، أو تفاصيل الأجهزة...",
    checkboxText: lang === "EN"
      ? "I agree to the secure data processing and SLA response guidelines."
      : "أوافق على سياسة معالجة البيانات الفنية المشفرة ودليل زمن الاستجابة الفني.",
    submitBtn: lang === "EN" ? "SUBMIT ENGINEERING INQUIRY" : "إرسال طلب التقييم الهندسي",
    submittingBtn: lang === "EN" ? "DISPATCHING INQUIRY..." : "جاري إرسال الطلب...",

    // Compliance section
    complianceTitle: lang === "EN" ? "Institutional Compliance & Security Notice" : "تنويه الامتثال التنظيمي والأمن المؤسسي",
    complianceText: lang === "EN"
      ? "MKT operates under strict SFDA (Saudi Food & Drug Authority) licensing and Ministry of Interior security mandates. All data processed through our communication portal is stored securely in alignment with Kingdom cyber-security protocols."
      : "تعمل شركة تجارة المعرفة الحديثة (MKT) بموجب التراخيص الصارمة الصادرة عن الهيئة العامة للغذاء والدواء والاشتراطات الأمنية المعتمدة. جميع البيانات الفنية يتم تشفيرها وحفظها محلياً وفقاً لبروتوكولات الأمن السيبراني الوطنية للجهات الحكومية والخاصة."
  };

  const serviceOptions = [
    lang === "EN" ? "Modern Trading Systems" : "أنظمة التبادل المعرفي والتجاري الحديثة",
    lang === "EN" ? "CSSD Sterile Department Design" : "تصميم وإعداد غرف التعقيم المركزي CSSD",
    lang === "EN" ? "Endoscopy & Infection Control Units" : "وحدات مناظير الجهاز الهضمي والتحكم بالعدوى",
    lang === "EN" ? "Forensic Sciences & Crime Lab Tech" : "علوم الطب الشرعي وأجهزة الكشف الجنائي",
    lang === "EN" ? "Clinical Maintenance SLAs" : "اتفاقيات الصيانة الطبية الدورية"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.org || !formData.email) return;

    setIsSubmitting(true);

    // Simulate clinical submittal pipeline
    setTimeout(() => {
      const randRef = `MKT-REG-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedData({
        reference: randRef,
        timestamp: new Date().toLocaleString(),
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        org: "",
        email: "",
        service: "Modern Trading Systems",
        requirements: "",
        agreed: false
      });
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#F7F9FB] text-start"
    >
      
      {/* 1. Hero Section */}
      <section className="bg-[#001E40] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-[#C3C6D1]">
        <div className="max-w-7xl mx-auto flex flex-col gap-4 text-start">
          <span className="font-mono text-xs font-bold tracking-widest text-[#799DD6] uppercase">
            {labels.tag}
          </span>
          <h1 className="font-sans font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {labels.title}
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#799DD6] max-w-3xl leading-relaxed">
            {labels.desc}
          </p>
        </div>
      </section>

      {/* 2. Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Map Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            
            {/* Contact Info Card */}
            <div className="bg-white border border-[#C3C6D1] rounded p-6 sm:p-8 shadow-sm flex flex-col gap-8 text-start">
              <h2 className="font-sans font-bold text-xl sm:text-2xl text-[#001E40] tracking-tight">
                {labels.infoCardTitle}
              </h2>

              <div className="flex flex-col gap-6">
                {/* Headquarters address */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#165DB2] tracking-wider uppercase">
                      {labels.addrTitle}
                    </h4>
                    <p className="font-sans text-sm text-[#191C1E] mt-1 font-semibold">
                      <a href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341" target="_blank" rel="noopener noreferrer" className="hover:text-[#165DB2] transition-colors">
                        {labels.addrDesc}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Clinical Hotline */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#165DB2] tracking-wider uppercase">
                      {labels.phoneTitle}
                    </h4>
                    <p className="font-sans text-sm text-[#191C1E] mt-1 font-semibold">
                      <a href={`tel:${labels.phoneDesc.replace(/\s+/g, '')}`} className="hover:text-[#165DB2] transition-colors">
                        {labels.phoneDesc}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Secure email */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-mono text-xs font-bold text-[#165DB2] tracking-wider uppercase">
                      {labels.emailTitle}
                    </h4>
                    <p className="font-sans text-sm text-[#165DB2] mt-1 font-semibold">
                      <a href={`mailto:${labels.emailDesc}`} className="hover:underline">
                        {labels.emailDesc}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Preview Simulation */}
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#E0E3E5] border border-[#C3C6D1] rounded overflow-hidden h-[300px] relative flex items-center justify-center block hover:opacity-90 transition-opacity cursor-pointer group"
            >
              {/* Overlay styling for blueprint/cybergrid feel */}
              <div className="absolute inset-0 bg-[#001E40]/15 mix-blend-color-burn" />
              <div className="absolute inset-0 bg-[radial-gradient(#165db2_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30" />
              
              <div className="relative z-10 bg-white border border-[#C3C6D1] p-4 rounded-sm shadow-xl flex items-center gap-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-3 h-3 bg-[#165DB2] rounded-full shrink-0 animate-ping absolute" />
                <div className="w-2.5 h-2.5 bg-[#165DB2] rounded-full shrink-0 relative" />
                <div className="flex flex-col text-start">
                  <span className="font-mono text-xs font-bold text-[#191C1E] tracking-wider uppercase">
                    {labels.mapPinLabel}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">24°46'22.1"N 46°42'31.5"E</span>
                </div>
              </div>
            </a>

          </motion.div>

          {/* Right Column: Dynamic Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 bg-white border border-[#C3C6D1] rounded p-6 sm:p-10 lg:p-12 shadow-sm"
          >
            
            {submittedData ? (
              /* Success view */
              <div className="text-center py-8 flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-[#22C55E]" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-2xl text-[#001E40]">
                    {lang === "EN" ? "Consultation Requested" : "تم استلام طلب الاستشارة"}
                  </h3>
                  <p className="font-sans text-sm text-[#43474F] leading-relaxed mt-2">
                    {lang === "EN" 
                      ? "Thank you. Your request has been queued in our central Riyadh medical deployment system."
                      : "نشكر اهتمامكم. تم إدراج طلبكم في نظام معالجة المشاريع والطلبات الفنية بمقرنا الرئيسي بالرياض."}
                  </p>
                </div>

                <div className="w-full bg-[#F2F4F6] border border-[#C3C6D1] p-5 rounded text-start flex flex-col gap-3 font-mono text-xs text-[#001E40]">
                  <div className="flex justify-between border-b border-[#C3C6D1]/60 pb-2">
                    <span className="font-bold">{lang === "EN" ? "SECURE REF ID" : "الرقم المرجعي الآمن"}</span>
                    <span className="text-[#165DB2] font-extrabold">{submittedData.reference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "EN" ? "TIMESTAMPS" : "وقت الطلب"}</span>
                    <span>{submittedData.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "EN" ? "SLA SLA RESPONSE" : "زمن الرد والاستجابة"}</span>
                    <span className="text-green-600 font-bold">{lang === "EN" ? "WITHIN 12 HOURS" : "خلال ١٢ ساعة عمل"}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmittedData(null)}
                  className="font-mono text-xs font-bold text-[#165DB2] hover:text-[#001E40] transition-colors"
                >
                  {lang === "EN" ? "← SUBMIT ANOTHER CONSULTATION" : "← تقديم طلب استشارة جديد"}
                </button>
              </div>
            ) : (
              /* Interactive Form view */
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-start">
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-[#001E40]">
                    {labels.formTitle}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed mb-4">
                    {labels.formDesc}
                  </p>
                </div>

                {/* Name & Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] flex items-center gap-1 ${lang === "EN" ? "font-mono text-[11px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {lang === "AR" && <span className="text-red-500">*</span>}
                      {labels.labelName}
                      {lang === "EN" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "EN" ? "e.g. Eng. Khalid Al-Otaibi" : "مثال: م. خالد العتيبي"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] flex items-center gap-1 ${lang === "EN" ? "font-mono text-[11px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {lang === "AR" && <span className="text-red-500">*</span>}
                      {labels.labelOrg}
                      {lang === "EN" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "EN" ? "e.g. King Fahad Hospital" : "مثال: مستشفى الملك فهد"}
                      value={formData.org}
                      onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2]"
                    />
                  </div>
                </div>

                {/* Email & Service Interest */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] flex items-center gap-1 ${lang === "EN" ? "font-mono text-[11px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {lang === "AR" && <span className="text-red-500">*</span>}
                      {labels.labelEmail}
                      {lang === "EN" && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={lang === "EN" ? "name@company.com" : "email@hospital.gov.sa"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2]"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className={`font-bold text-[#43474F] ${lang === "EN" ? "font-mono text-[11px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                      {labels.labelInterest}
                    </label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2] appearance-none cursor-pointer"
                      >
                        {serviceOptions.map((opt, oidx) => (
                          <option key={oidx} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#43474F] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Technical Requirements */}
                <div className="flex flex-col gap-2">
                  <label className={`font-bold text-[#43474F] ${lang === "EN" ? "font-mono text-[11px] uppercase tracking-wider" : "font-sans text-xs"}`}>
                    {labels.labelReqs}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={labels.placeholderReqs}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full bg-[#F7F9FB] border border-[#C3C6D1] rounded px-4 py-3 text-sm text-[#001E40] focus:outline-none focus:ring-1 focus:ring-[#165DB2]"
                  />
                </div>

                {/* Policy Agreement checkbox */}
                <div className="flex items-start gap-3 py-2">
                  <input
                    type="checkbox"
                    id="checkbox-policy"
                    required
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-[#C3C6D1] text-[#165DB2] focus:ring-[#165DB2] cursor-pointer"
                  />
                  <label htmlFor="checkbox-policy" className="font-sans text-xs sm:text-sm text-[#43474F] cursor-pointer">
                    {labels.checkboxText}
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreed}
                  className="w-full bg-[#001E40] hover:bg-[#165DB2] text-white font-mono text-xs font-bold py-4 rounded transition-all duration-200 shadow hover:shadow-md cursor-pointer tracking-wider uppercase disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{labels.submittingBtn}</span>
                    </>
                  ) : (
                    <span>{labels.submitBtn}</span>
                  )}
                </button>

              </form>
            )}

          </motion.div>

        </div>
      </section>

      {/* 3. Compliance and Security Section */}
      <section className="bg-[#ECEEF0] border-t border-b border-[#C3C6D1] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 opacity-80">
          <div className="w-12 h-12 bg-white text-[#001E40] rounded-lg border border-[#C3C6D1] flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex flex-col text-start gap-2">
            <h4 className="font-sans font-bold text-sm sm:text-base text-[#001E40]">
              {labels.complianceTitle}
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
              {labels.complianceText}
            </p>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
