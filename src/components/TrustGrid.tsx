import { useState, useEffect, useRef } from "react";
import { Check, Shield, Server, Users, Award } from "lucide-react";
import { motion, useInView, animate } from "motion/react";

interface TrustGridProps {
  lang: "EN" | "AR";
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.floor(latest)),
      });
      return controls.stop;
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustGrid({ lang }: TrustGridProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const stats = [
    {
      id: 1,
      metricValue: 10,
      metricSuffix: "+",
      labelEn: "YEARS OPERATIONAL",
      labelAr: "سنة من التشغيل",
      subEn: "ESTABLISHED SERVICE AT SCALE",
      subAr: "خدمات راسخة وموسعة",
      detailsEn: "Pioneering technology lifecycle integration and dedicated local engineering leadership since 2019.",
      detailsAr: "ريادة تكامل دورة حياة التقنيات الطبية والقيادة الهندسية المحلية المعتمدة منذ عام ٢٠١٩.",
      icon: Server,
    },
    {
      id: 2,
      metricValue: 10,
      metricSuffix: "k+",
      labelEn: "TOTAL IMPLEMENTATIONS",
      labelAr: "إجمالي التركيبات والتشغيل",
      subEn: "ACROSS CLINICAL ENVIRONMENT",
      subAr: "في البيئات الطبية والسريرية",
      detailsEn: "Precision installation of high-tier autoclaves, monitors, and surgical furniture across major wards.",
      detailsAr: "تركيب وتشغيل أجهزة التعقيم والشاشات وأثاث العمليات بدقة متناهية في الأقسام الكبرى.",
      icon: Shield,
    },
    {
      id: 3,
      metricValue: 800,
      metricSuffix: "+",
      labelEn: "INSTITUTIONAL PARTNERS",
      labelAr: "الشركاء من المؤسسات",
      subEn: "GOVERNMENT & CLINICAL DEPT",
      subAr: "القطاعات الحكومية والصحية",
      detailsEn: "Trusted by Saudi defense sectors, security medical centers, and public teaching hospitals.",
      detailsAr: "شريك تقني موثوق للقطاعات الأمنية والمدن الطبية والمستشفيات التخصصية الحكومية.",
      icon: Users,
    },
    {
      id: 4,
      metricValue: 100,
      metricSuffix: "%",
      labelEn: "COMPLIANCE RATING",
      labelAr: "معدل الامتثال والالتزام",
      subEn: "ISO & SFDA REGULATED",
      subAr: "معايير الغذاء والدواء والآيزو",
      detailsEn: "Complete alignment with Saudi Food & Drug Authority (SFDA) protocols and ISO certifications.",
      detailsAr: "التزام كامل بمعايير الهيئة العامة للغذاء والدواء (SFDA) ومواصفات الجودة العالمية.",
      icon: Award,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white border-b border-[#C3C6D1] py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">
        {/* Top bar: Title and Status badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3 text-start">
            <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
              {lang === "EN" ? "TRUST AND SCALE" : "الموثوقية والانتشار"}
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight">
              {lang === "EN" ? "Strategic Performance Grid" : "شبكة الأداء الاستراتيجي"}
            </h2>
            <p className="max-w-2xl font-sans text-sm sm:text-base text-[#43474F] mt-1 leading-relaxed">
              {lang === "EN"
                ? "Every medical infrastructure project is tracked in real-time under clinical-grade quality metrics, securing the operational readiness of the Kingdom's diagnostic grids."
                : "نتابع كل مشروع بنية تحتية طبية في الوقت الفعلي وفق معايير جودة سريرية صارمة، لضمان جاهزية التشغيل لشبكات الرعاية الصحية في المملكة."}
            </p>
          </div>

          {/* System operational status capsule */}
          <div className="self-start md:self-end flex items-center gap-3 bg-[#ECEEF0] border border-[#C3C6D1] px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-ping" />
            <span className="font-mono text-[11px] font-bold tracking-wider text-[#43474F]">
              {lang === "EN" ? "SYSTEM LEVEL: OPERATIONAL" : "مستوى النظام: تشغيلي نشط"}
            </span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            const isHovered = hoveredCard === idx;
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                key={stat.id}
                id={`stat-card-${stat.id}`}
                className="box-border flex flex-col justify-between p-8 bg-[#F2F4F6] border border-[#C3C6D1] transition-all duration-300 relative group overflow-hidden min-h-[220px]"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Tech card background grid accent */}
                <div className="absolute top-0 end-0 p-2 opacity-5 group-hover:opacity-15 transition-opacity">
                  <IconComponent className="w-20 h-20 text-[#001E40]" />
                </div>

                <div className="flex flex-col gap-2">
                  {/* Metric number */}
                  <span className="font-sans font-bold text-5xl tracking-tighter text-[#165DB2] group-hover:text-[#001E40] transition-colors">
                    <AnimatedCounter value={stat.metricValue} suffix={stat.metricSuffix} />
                  </span>

                  {/* Label (YEARS OPERATIONAL, etc.) */}
                  <span className="font-mono text-xs font-bold tracking-wider text-[#001E40] uppercase">
                    {lang === "EN" ? stat.labelEn : stat.labelAr}
                  </span>
                </div>

                {/* Bottom section with divider and subtext */}
                <div className="mt-8 pt-4 border-t border-[#C3C6D1]/60 flex flex-col gap-2">
                  <span className="font-mono text-[10px] font-semibold text-[#43474F] tracking-wider uppercase">
                    {lang === "EN" ? stat.subEn : stat.subAr}
                  </span>
                  
                  <p className="font-sans text-xs text-[#43474F] leading-relaxed transition-all duration-300">
                    {lang === "EN" ? stat.detailsEn : stat.detailsAr}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
