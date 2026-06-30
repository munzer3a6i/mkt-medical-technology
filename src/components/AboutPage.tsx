import React from "react";
import { motion } from "motion/react";
import autoclaveImage from "@/assets/autoclave sterilizer system.jpg";
import { 
  Building2, 
  Target, 
  Eye, 
  ShieldCheck, 
  MapPin, 
  Award, 
  FileText,
  Users,
  Compass,
  ArrowUpRight,
  Fingerprint,
  PhoneCall,
  Mail
} from "lucide-react";

interface AboutPageProps {
  lang: "EN" | "AR";
  onNavigateHomeSection: (sectionId: string) => void;
}

export default function AboutPage({ lang, onNavigateHomeSection }: AboutPageProps) {
  
  const labels = {
    badge: lang === "EN" ? "FOUNDED 2019 • RIYADH" : "تأسست عام ٢٠١٩ • الرياض",
    title: lang === "EN" 
      ? "Pioneering the Future of Forensic Science in Saudi Arabia."
      : "ريادة مستقبل العلوم الجنائية والطبية في المملكة العربية السعودية.",
    desc: lang === "EN"
      ? "Modern Knowledge Trading Co. (MKT) bridges international technological innovation with the specific operational demands of Saudi Arabia's hospitals and defense health systems."
      : "تقوم شركة تجارة المعرفة الحديثة (MKT) بجسر الفجوة بين الابتكارات التقنية العالمية والاحتياجات التشغيلية للمستشفيات والقطاعات الصحية والأمنية في المملكة.",
    
    // Mission & Vision
    missionTitle: lang === "EN" ? "Our Mission" : "رسالتنا",
    missionDesc: lang === "EN"
      ? "To empower Saudi Arabia's forensic and healthcare sectors with cutting-edge global technologies, ensuring the highest standards of accuracy and operational excellence for our national institutions."
      : "تمكين قطاعات الطب الشرعي والرعاية الصحية في المملكة العربية السعودية بأحدث التقنيات العالمية، مع ضمان أعلى معايير الدقة والتميز التشغيلي لمؤسساتنا الوطنية الحساسة.",
    
    visionTitle: lang === "EN" ? "Our Vision" : "رؤيتنا",
    visionDesc: lang === "EN"
      ? "To be the undisputed strategic partner for forensic innovation in the Middle East by 2030."
      : "أن نكون الشريك الاستراتيجي الأول والموثوق للابتكار الجنائي والتطوير الطبي في الشرق الأوسط بحلول عام ٢٠٣٠.",

    // Values
    valuesTitle: lang === "EN" ? "Our Values" : "قيمنا الراسخة",
    val1Title: lang === "EN" ? "Transparency" : "الشفافية والوضوح",
    val1Desc: lang === "EN" ? "Open communication and clear data-driven reporting in every transaction." : "الاتصال المفتوح والتقارير الواضحة المستندة إلى البيانات والنتائج الفعلية.",
    val2Title: lang === "EN" ? "Integrity" : "النزاهة والأمانة",
    val2Desc: lang === "EN" ? "Unwavering ethical standards in handling sensitive forensic diagnostics." : "الالتزام التام بالمعايير الأخلاقية والمهنية الصارمة في التعامل مع الأنظمة الطبية والجنائية.",
    val3Title: lang === "EN" ? "Accountability" : "المسؤولية الكاملة",
    val3Desc: lang === "EN" ? "Owning the outcomes of our solutions to ensure institutional trust." : "تحمل المسؤولية الكاملة عن جودة تشغيل حلولنا لترسيخ ثقة الشركاء والجهات الرسمية.",

    // Partnerships
    alliancesTitle: lang === "EN" ? "Strategic Institutional Alliances" : "التحالفات والشراكات الاستراتيجية",
    alliancesDesc: lang === "EN"
      ? "Our position as a trusted vendor is cemented through deep-rooted collaborations with the Kingdom's most critical entities. We provide the Ministry of Interior and national Forensic Departments with the tools required for justice and public safety."
      : "تترسخ مكانتنا كمزود موثوق من خلال التعاون الوثيق مع أكثر الجهات حساسية في المملكة. نحن نوفر لوزارة الداخلية وإدارات الأدلة الجنائية والطب الشرعي الأدوات اللازمة لتحقيق العدالة والسلامة العامة.",
    partnerItem1: lang === "EN" ? "MINISTRY OF INTERIOR FORENSIC DEPARTMENTS" : "إدارات الأدلة الجنائية بوزارة الداخلية",
    partnerItem2: lang === "EN" ? "NATIONAL SECURITY & DEFENSE MEDICAL LABS" : "المختبرات الطبية والأمنية بقطاعات الدفاع الوطني",
    partnerItem3: lang === "EN" ? "LEADING SAUDI UNIVERSITY RESEARCH CENTERS" : "المراكز البحثية بالجامعات السعودية الرائدة",

    // Leadership
    leadTitle: lang === "EN" ? "Advancing Saudi Healthcare" : "الارتقاء بالرعاية الصحية السعودية",
    leadQuote: lang === "EN"
      ? "“Our commitment extends beyond commerce. We are architects of a safer, healthier Saudi Arabia, aligning every technological advancement with the visionary goals of Vision 2030.”"
      : "“إن التزامنا يمتد إلى ما هو أبعد من مجرد التبادل التجاري. نحن نبني بنية تحتية لأمن وصحة وطننا، مع مواءمة كل تقدم تكنولوجي مع الأهداف الملهمة لرؤية المملكة ٢٠٣٠.”",
    leadName: lang === "EN" ? "MKT Board of Directors" : "مجلس إدارة إم كي تي",
    leadSub: lang === "EN" ? "Riyadh, Kingdom of Saudi Arabia" : "الرياض، المملكة العربية السعودية",

    // Vision 2030 Sub-items
    sovereigntyTitle: lang === "EN" ? "Technological Sovereignty" : "السيادة والريادة التقنية",
    sovereigntyDesc: lang === "EN" 
      ? "Localizing expertise to ensure long-term sustainability in Saudi forensics."
      : "توطين الخبرات الفنية لضمان الاستدامة طويلة الأجل في علوم الطب الشرعي السعودية.",
    v2030Title: lang === "EN" ? "Vision 2030 Alignment" : "المواءمة مع رؤية ٢٠٣٠",
    v2030Desc: lang === "EN"
      ? "Driving digital transformation within the health and security sectors."
      : "قيادة التحول الرقمي والتكنولوجي الشامل في قطاعي الصحة والأمن القومي.",

    // Location
    presenceTitle: lang === "EN" ? "Our Presence" : "تواجدنا الجغرافي",
    presenceDesc: lang === "EN"
      ? "Headquartered in the heart of Riyadh, MKT serves institutions across the entire Kingdom."
      : "يقع مقرنا الرئيسي في قلب العاصمة الرياض، ونقدم خدماتنا للمؤسسات والقطاعات الطبية والأمنية في جميع أنحاء المملكة.",
    addrTitle: lang === "EN" ? "HEADQUARTERS OFFICE" : "مقر الإدارة الفنية والتشغيل",
    addrDesc: lang === "EN" ? "Al-Takhassusi Branch Street, Ar-Rahmaniyah, Riyadh 12341" : "شارع التخصصي الفرعي، الرحمانية، الرياض 12341",
    phoneTitle: lang === "EN" ? "DIRECT INQUIRY LINE" : "رقم التواصل المباشر للجهات",
    phoneDesc: lang === "EN" ? "+966 56 443 3288" : "+966 56 443 3288",
    emailTitle: lang === "EN" ? "SECURE EMAIL" : "البريد الإلكتروني",
    emailDesc: "info@mkt.sa",
    mapPinLabel: lang === "EN" ? "MKT RIYADH CENTER" : "مقر MKT الفني بالرياض"
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
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C3C6D1]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase bg-[#D5E3FF] px-3.5 py-1.5 rounded-full self-start">
              {labels.badge}
            </span>
            <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#001E40] tracking-tight leading-tight">
              {labels.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#43474F] leading-relaxed max-w-2xl">
              {labels.desc}
            </p>
          </div>

          {/* Hero Right Image Column */}
          <div className="lg:col-span-5 bg-[#ECEEF0] border border-[#C3C6D1] rounded-lg overflow-hidden shadow-md h-[400px] lg:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
              alt="Pioneering future of forensic sciences in Saudi Arabia"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>

        </div>
      </section>

      {/* 2. Mission & Vision Section (Bento layout style) */}
      <section className="bg-[#F2F4F6] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#C3C6D1]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Mission Card (2/3 width) */}
            <div className="lg:col-span-2 bg-white border border-[#C3C6D1] rounded-lg p-8 sm:p-12 shadow-sm flex flex-col gap-6 text-start justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#D5E3FF] text-[#165DB2] flex items-center justify-center rounded">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#001E40] tracking-tight">
                  {labels.missionTitle}
                </h2>
                <p className="font-sans text-base sm:text-lg text-[#43474F] leading-relaxed">
                  {labels.missionDesc}
                </p>
              </div>

              <div className="text-xs font-mono font-bold text-[#165DB2] uppercase tracking-wider mt-4">
                SFDA • HEALTHCARE SOLUTIONS • COMPLIANT ENGINEERING
              </div>
            </div>

            {/* Vision Card (1/3 width) */}
            <div className="bg-[#001E40] text-white rounded-lg p-8 sm:p-12 shadow-sm flex flex-col gap-6 text-start justify-between">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#7FF5F4] text-[#002020] flex items-center justify-center rounded">
                  <Eye className="w-6 h-6" />
                </div>
                <h2 className="font-sans font-bold text-2xl text-white tracking-tight">
                  {labels.visionTitle}
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#A7C8FF] leading-relaxed">
                  {labels.visionDesc}
                </p>
              </div>

              <div className="text-xs font-mono font-bold text-[#7FF5F4] uppercase tracking-wider mt-4">
                SAUDI VISION 2030 PARTNER
              </div>
            </div>

          </div>

          {/* Value Pillars (3 Columns) */}
          <div className="flex flex-col gap-6 mt-4">
            <h3 className="font-mono text-xs font-bold text-[#001E40] border-b border-[#C3C6D1] pb-2 uppercase tracking-wider self-start">
              {labels.valuesTitle}
            </h3>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              
              {/* Pillar 1 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-white border border-[#C3C6D1] rounded p-6 shadow-sm flex flex-col gap-3 text-start"
              >
                <h4 className="font-sans font-bold text-lg text-[#165DB2]">
                  {labels.val1Title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                  {labels.val1Desc}
                </p>
              </motion.div>

              {/* Pillar 2 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-white border border-[#C3C6D1] rounded p-6 shadow-sm flex flex-col gap-3 text-start"
              >
                <h4 className="font-sans font-bold text-lg text-[#165DB2]">
                  {labels.val2Title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                  {labels.val2Desc}
                </p>
              </motion.div>

              {/* Pillar 3 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                className="bg-white border border-[#C3C6D1] rounded p-6 shadow-sm flex flex-col gap-3 text-start"
              >
                <h4 className="font-sans font-bold text-lg text-[#165DB2]">
                  {labels.val3Title}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                  {labels.val3Desc}
                </p>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* 3. Strategic Partnerships Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6 text-start">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#001E40] tracking-tight">
              {labels.alliancesTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
              {labels.alliancesDesc}
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4 py-3 border-b border-[#C3C6D1] text-xs sm:text-sm font-mono font-bold text-[#191C1E]">
                <Fingerprint className="w-5 h-5 text-[#165DB2] shrink-0" />
                <span>{labels.partnerItem1}</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-[#C3C6D1] text-xs sm:text-sm font-mono font-bold text-[#191C1E]">
                <Award className="w-4 h-5 text-[#165DB2] shrink-0" />
                <span>{labels.partnerItem2}</span>
              </div>
              <div className="flex items-center gap-4 py-3 border-b border-[#C3C6D1] text-xs sm:text-sm font-mono font-bold text-[#191C1E]">
                <FileText className="w-5 h-5 text-[#165DB2] shrink-0" />
                <span>{labels.partnerItem3}</span>
              </div>
            </div>
          </div>

          {/* High density layout images representing national security forensic precision */}
          <div className="grid grid-cols-2 gap-4">
            <div className="h-80 bg-[#ECEEF0] border border-[#C3C6D1] rounded-lg overflow-hidden">
              <img
                src={autoclaveImage}
                alt="Crime Lab Autoclave Sterilizer Systems"
                className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="h-80 bg-[#ECEEF0] border border-[#C3C6D1] rounded-lg overflow-hidden mt-8">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400"
                alt="High-accuracy DNA analysis forensic laboratory"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 4. Leadership Commitment Section (Dark Blue immersive theme) */}
      <section className="bg-[#003366] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-b border-[#C3C6D1]">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 text-center items-center">
          
          <h2 className="font-sans font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {labels.leadTitle}
          </h2>

          <blockquote className="font-sans font-light italic text-xl sm:text-3xl text-white leading-relaxed max-w-3xl">
            {labels.leadQuote}
          </blockquote>

          {/* Cite footer */}
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 bg-[#6CA3FD] text-[#003874] flex items-center justify-center rounded-xl font-bold text-lg">
              M
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-white tracking-wide uppercase">
                {labels.leadName}
              </p>
              <p className="font-sans text-xs text-[#799DD6]">
                {labels.leadSub}
              </p>
            </div>
          </div>

          {/* Sub-cards overlays (Technological Sovereignty & Vision 2030) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded text-start flex flex-col gap-2">
              <h4 className="font-mono text-xs font-bold text-[#7FF5F4] uppercase tracking-wider">
                {labels.sovereigntyTitle}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#D6E3FF] leading-relaxed">
                {labels.sovereigntyDesc}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded text-start flex flex-col gap-2">
              <h4 className="font-mono text-xs font-bold text-[#7FF5F4] uppercase tracking-wider">
                {labels.v2030Title}
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#D6E3FF] leading-relaxed">
                {labels.v2030Desc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Location Section (Our Presence map preview) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 flex flex-col gap-6 text-start">
            <h2 className="font-sans font-bold text-2xl sm:text-3xl text-[#001E40] tracking-tight">
              {labels.presenceTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
              {labels.presenceDesc}
            </p>

            <div className="flex flex-col gap-4 mt-4">
              
              {/* Address */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#001E40] tracking-wider uppercase">
                    {labels.addrTitle}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#43474F] mt-0.5">
                    <a href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341" target="_blank" rel="noopener noreferrer" className="hover:text-[#165DB2] transition-colors underline">
                      {labels.addrDesc}
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#001E40] tracking-wider uppercase">
                    {labels.phoneTitle}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#43474F] mt-0.5 font-mono">
                    <a href="tel:+966564433288" className="hover:text-[#165DB2] transition-colors">
                      {labels.phoneDesc}
                    </a>
                  </p>
                </div>
              </div>

              {/* Email Line */}
              <div className="flex gap-4 mt-2">
                <div className="w-8 h-8 bg-[#ECEEF0] text-[#165DB2] flex items-center justify-center rounded shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#001E40] tracking-wider uppercase">
                    {labels.emailTitle}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#43474F] mt-0.5 font-mono hover:underline">
                    <a href={`mailto:${labels.emailDesc}`} className="hover:text-[#165DB2] transition-colors">
                      {labels.emailDesc}
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Map Placeholder simulation grid */}
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341" 
            target="_blank" 
            rel="noopener noreferrer"
            className="lg:col-span-7 bg-[#ECEEF0] border border-[#C3C6D1] rounded-lg p-1 shadow-inner h-[320px] relative overflow-hidden flex items-center justify-center block hover:opacity-90 transition-opacity cursor-pointer group"
          >
            
            {/* Styled background simulating high density topography/blueprint map */}
            <div className="absolute inset-0 bg-[#001E40]/10 mix-blend-color-burn opacity-70" />
            <div className="absolute inset-0 bg-[radial-gradient(#165db2_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            {/* Absolute custom pin overlay card */}
            <div className="relative z-10 bg-white border border-[#C3C6D1] p-4 rounded-sm shadow-xl flex items-center gap-3 max-w-xs group-hover:scale-105 transition-transform duration-300">
              <div className="w-3.5 h-3.5 bg-[#165DB2] rounded-full shrink-0 animate-ping absolute" />
              <div className="w-3 h-3 bg-[#165DB2] rounded-full shrink-0 relative" />
              <div className="flex flex-col text-start">
                <span className="font-mono text-xs font-bold text-[#001E40] tracking-wider uppercase">
                  {labels.mapPinLabel}
                </span>
                <span className="text-[10px] text-gray-500 font-mono">24°46'22.1\"N 46°42'31.5\"E</span>
              </div>
            </div>

          </a>

        </div>
      </section>

    </motion.div>
  );
}
