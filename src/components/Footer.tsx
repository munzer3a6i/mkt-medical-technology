import { Globe, Linkedin, Twitter, ShieldCheck, HeartPulse, Clock, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import logoFooter from "@/assets/MKT logo footer.png";

interface FooterProps {
  lang: "EN" | "AR";
  onSectionClick: (sectionId: string) => void;
}

export default function Footer({ lang, onSectionClick }: FooterProps) {
  const [riyadhTime, setRiyadhTime] = useState("");

  useEffect(() => {
    // Live update for Riyadh time (UTC+3)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Riyadh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setRiyadhTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-[#001E40] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#C3C6D1]/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand details */}
          <div className="flex flex-col gap-6 text-start">
            <div className="flex items-center gap-2">
              <img src={logoFooter} alt="MKT Solutions" className="h-14 w-auto object-contain" />
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-[#A7C8FF] leading-relaxed max-w-xs">
              {lang === "EN"
                ? "Advanced medical solutions for a progressing Kingdom. Excellence in clinical infrastructure since 2019."
                : "حلول طبية متطورة لمستقبل المملكة الواعد. التميز والريادة في البنية التحتية السريرية والتشغيلية للأجهزة منذ ٢٠١٩."}
            </p>

            {/* Quality Standard Badges */}
            <div className="flex items-center gap-3 bg-[#003366] p-3 rounded border border-[#C3C6D1]/10 max-w-xs">
              <ShieldCheck className="w-8 h-8 text-[#22C55E]" />
              <div className="flex flex-col text-start">
                <span className="font-mono text-[9px] font-bold text-white uppercase tracking-wider">
                  {lang === "EN" ? "CERTIFICATION STATUS" : "اعتمادات الجودة"}
                </span>
                <span className="font-sans text-[10px] text-[#A7C8FF] leading-tight">
                  ISO 9001 • ISO 13485 • SFDA Licensed
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Company Links */}
          <div className="flex flex-col gap-4 text-start md:ps-6">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {lang === "EN" ? "COMPANY" : "الشركة"}
            </h5>
            <ul className="flex flex-col gap-2.5">
              {["home", "services", "equipment", "about", "partners", "process", "contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onSectionClick(item)}
                    className="font-sans text-xs sm:text-sm text-[#A7C8FF] hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {item === "home" ? (lang === "EN" ? "Home / Welcome" : "الرئيسية") : ""}
                    {item === "services" ? (lang === "EN" ? "Technical Divisions" : "الأقسام والخدمات") : ""}
                    {item === "equipment" ? (lang === "EN" ? "Medical Equipment" : "كتالوج الأجهزة والمعدات") : ""}
                    {item === "about" ? (lang === "EN" ? "About Us & Story" : "قصتنا ورسالتنا") : ""}
                    {item === "partners" ? (lang === "EN" ? "Partnerships & Alliances" : "الشركاء والتحالفات") : ""}
                    {item === "process" ? (lang === "EN" ? "Our Methodology" : "منهجية العمل") : ""}
                    {item === "contact" ? (lang === "EN" ? "Contact & Inquiries" : "اتصل بنا وقدم استفسارك") : ""}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Legal info */}
          <div className="flex flex-col gap-4 text-start">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {lang === "EN" ? "LEGAL" : "الشؤون القانونية"}
            </h5>
            <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-[#A7C8FF]">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {lang === "EN" ? "Legal & Disclaimers" : "إخلاء المسؤولية القانونية"}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {lang === "EN" ? "Privacy Policy" : "سياسة الخصوصية"}
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  {lang === "EN" ? "Terms of Service" : "شروط الاستخدام والخدمة"}
                </span>
              </li>
              <li>
                <span className="text-[10px] bg-[#003366] text-[#A7C8FF] px-2 py-0.5 rounded font-mono font-bold tracking-widest uppercase">
                  SFDA REG: 1010-928-19
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Connect & Riyadh Time */}
          <div className="flex flex-col gap-4 text-start">
            <h5 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {lang === "EN" ? "RIYADH CENTRAL" : "مقر الرياض"}
            </h5>
            <div className="flex flex-col gap-2.5">
              <p className="font-sans text-xs sm:text-sm text-[#A7C8FF] leading-relaxed">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Al-Takhassusi+Branch+Street,+Ar-Rahmaniyah,+Riyadh+12341"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {lang === "EN"
                    ? "Al-Takhassusi Branch Street, Ar-Rahmaniyah, Riyadh 12341"
                    : "شارع التخصصي الفرعي، الرحمانية، الرياض 12341"}
                </a>
              </p>

              {/* Phone and Email */}
              <div className="flex flex-col gap-1.5 mt-1">
                <a href="tel:+966564433288" className="font-sans text-xs sm:text-sm text-[#A7C8FF] hover:text-white transition-colors flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5" />
                  <span dir="ltr">+966 56 443 3288</span>
                </a>
                <a href="mailto:info@mkt.sa" className="font-sans text-xs sm:text-sm text-[#A7C8FF] hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" />
                  info@mkt.sa
                </a>
              </div>

              {/* Live Riyadh clock */}
              <div className="flex items-center gap-2 bg-[#003366] px-3.5 py-2 rounded border border-[#C3C6D1]/10 self-start text-xs font-mono text-[#A7C8FF] shadow-inner mt-2">
                <Clock className="w-3.5 h-3.5 text-[#165DB2]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider me-1">Riyadh:</span>
                <span className="text-white font-bold">{riyadhTime || "00:00:00 AM"}</span>
              </div>

              {/* Socials */}
              <div className="flex gap-4 mt-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#003366] hover:bg-[#165DB2] text-white rounded transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#003366] hover:bg-[#165DB2] text-white rounded transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="border-t border-white/5 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-[#A7C8FF]">
          <span>
            {lang === "EN"
              ? "© 2026 MKT Medical Solutions Co. All rights reserved."
              : "جميع الحقوق محفوظة © ٢٠٢٦ شركة إم كي تي للأجهزة والأنظمة الطبية المحدودة."}
          </span>
          <div className="flex gap-6">
            <span>
              {lang === "EN" ? "ISO 13485 CERTIFIED" : "شهادة آيزو ١٣٤٨٥ معتمدة"}
            </span>
            <span>
              {lang === "EN" ? "SFDA COMPLIANT" : "مطابق لتعليمات الغذاء والدواء"}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
