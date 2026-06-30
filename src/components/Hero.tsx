import { motion } from "motion/react";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";

interface HeroProps {
  lang: "EN" | "AR";
  onActionClick: (sectionId: string) => void;
  onOpenAssessment: () => void;
}

export default function Hero({ lang, onActionClick, onOpenAssessment }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[700px] lg:h-[721px] flex flex-col lg:flex-row items-stretch bg-[#001E40] text-white overflow-hidden"
    >
      {/* Left Column: Technical Context */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 lg:py-0 bg-[#001E40] relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl flex flex-col gap-8 text-start"
        >
          {/* Tag Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex self-start bg-[#165DB2] px-3 py-1 text-[11px] font-mono font-medium tracking-widest text-white uppercase rounded-sm"
          >
            {lang === "EN"
              ? "KINGDOM OF SAUDI ARABIA • EST. 2019"
              : "المملكة العربية السعودية • تأسست ٢٠١٩"}
          </motion.div>

          {/* Heading 1 */}
          <motion.h1
            variants={itemVariants}
            className="font-sans font-bold text-4xl sm:text-5xl lg:text-[48px] leading-[1.15] lg:leading-[58px] tracking-tight text-white"
          >
            {lang === "EN"
              ? "Precision Infrastructure for the Kingdom's Medical Future."
              : "بنية تحتية دقيقة لمستقبل القطاع الطبي في المملكة."}
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-base sm:text-lg text-[#A7C8FF] leading-relaxed"
          >
            {lang === "EN"
              ? "MKT provides the technical foundation for Saudi Arabia's clinical and security institutions. Since 2019, we have delivered ISO-certified technology solutions and expert lifecycle support."
              : "توفر إم كي تي الأساس التقني للمؤسسات السريرية والأمنية في المملكة العربية السعودية. منذ عام 2019، قدمنا حلولاً تقنية معتمدة بشهادات الآيزو العالمية ودعماً احترافياً متكاملاً."}
          </motion.p>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={onOpenAssessment}
              id="hero-assessment-btn"
              className="relative overflow-hidden group bg-white text-[#003874] px-8 py-4 font-sans font-bold text-sm tracking-wide rounded-sm shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-250 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-200">
                <FileText className="w-4 h-4 text-[#165DB2] group-hover:text-white transition-colors duration-200" />
                <span>{lang === "EN" ? "REQUEST ASSESSMENT" : "طلب تقييم هندسي"}</span>
              </span>
            </button>

            <button
              onClick={() => onActionClick("equipment")}
              id="hero-products-btn"
              className="relative overflow-hidden group border-2 border-[#D6E3FF] text-[#D6E3FF] px-8 py-4 font-sans font-bold text-sm tracking-wide rounded-sm text-center flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-[#D6E3FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-250 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-[#001E40] transition-colors duration-200">
                <span>{lang === "EN" ? "EXPLORE EQUIPMENT" : "استكشاف المعدات"}</span>
                <ArrowRight className="w-4 h-4 transition-transform rtl:rotate-180" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Column: Visual Splendor */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="w-full lg:w-1/2 relative min-h-[350px] lg:min-h-[721px] bg-[#003366]"
      >
        {/* Unsplash Image */}
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200"
          alt="Modern clinical infrastructure"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80"
        />

        {/* Local Riyadh Time Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-6 end-6 bg-[#001E40]/90 backdrop-blur-md border border-[#C3C6D1]/20 p-4 rounded text-start flex items-center gap-4 shadow-xl"
        >
          <div className="w-2.5 h-2.5 bg-[#22C55E] rounded-full animate-pulse" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#A7C8FF] uppercase tracking-wider">
              {lang === "EN" ? "SERVICE LEVEL STATUS" : "حالة الخدمة الطبية"}
            </span>
            <span className="font-sans font-bold text-white text-xs sm:text-sm tracking-tight">
              {lang === "EN" ? "OPERATIONAL • ACTIVE 24/7" : "نشط • خدمة مستمرة"}
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
