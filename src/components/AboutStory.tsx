import { motion } from "motion/react";

interface AboutStoryProps {
  lang: "EN" | "AR";
  onExploreDetailed?: () => void;
}

export default function AboutStory({ lang, onExploreDetailed }: AboutStoryProps) {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#F2F4F6] border-b border-[#C3C6D1] py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center"
      >
        
        {/* Left Column: Story Content */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
          }}
          className="w-full lg:w-1/2 flex flex-col gap-8 text-start"
        >
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
              {lang === "EN" ? "OUR CORPORATE PROFILE" : "ملف الشركة التعريفي"}
            </span>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight">
              {lang === "EN" ? "Our Story & Foundations" : "قصتنا وركائزنا الأساسية"}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed mt-2">
              {lang === "EN"
                ? "Since 2019, MKT has operated with a singular focus: to bridge international technological innovation with the specific operational demands of Saudi Arabia's hospitals and defense health systems."
                : "منذ عام 2019، تعمل إم كي تي بتركيز فريد: وهو ربط الابتكارات التقنية العالمية بالاحتياجات التشغيلية المحددة للمستشفيات والقطاعات الصحية والأمنية في المملكة."}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Mission Card */}
            <div className="bg-white border-s-4 border-[#165DB2] p-6 sm:p-8 rounded-e-sm shadow-sm hover:shadow-md transition-shadow">
              <span className="font-mono text-xs font-bold text-[#165DB2] tracking-wider block mb-2">
                {lang === "EN" ? "OUR MISSION" : "رسالتنا"}
              </span>
              <p className="font-sans text-base text-[#191C1E] leading-relaxed italic">
                {lang === "EN"
                  ? "“Transferring innovative medical products to make life better for people in Saudi Arabia.”"
                  : "“نقل المنتجات الطبية المبتكرة للارتقاء بجودة حياة الناس في المملكة العربية السعودية.”"}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white border-s-4 border-[#165DB2] p-6 sm:p-8 rounded-e-sm shadow-sm hover:shadow-md transition-shadow">
              <span className="font-mono text-xs font-bold text-[#165DB2] tracking-wider block mb-2">
                {lang === "EN" ? "OUR VISION" : "رؤيتنا"}
              </span>
              <p className="font-sans text-base text-[#191C1E] leading-relaxed italic">
                {lang === "EN"
                  ? "“To be an efficient partner of healthcare advancement in Saudi Arabia.”"
                  : "“أن نكون شريكاً ذا كفاءة عالية وموثوقية بالغة في دفع عجلة الرعاية الصحية في المملكة.”"}
              </p>
            </div>
          </div>

          {onExploreDetailed && (
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              className="mt-2 text-start"
            >
              <button
                onClick={onExploreDetailed}
                id="explore-detailed-about-btn"
                className="relative overflow-hidden group inline-flex items-center gap-2 bg-[#001E40] text-white font-mono text-xs font-bold px-8 py-4 rounded-sm shadow hover:shadow-md cursor-pointer uppercase tracking-wider"
              >
                <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>{lang === "EN" ? "Explore Our Full Company History" : "استكشاف كامل هويتنا وتاريخنا الفني"}</span>
                  <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180">➔</span>
                </span>
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Visual Facility & Overlay Quote */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: 20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
          }}
          className="w-full lg:w-1/2 relative min-h-[400px] lg:h-[450px] flex items-center justify-center"
        >
          
          {/* Main Facility Image */}
          <div className="w-full h-full rounded-lg border border-[#C3C6D1] overflow-hidden shadow-2xl relative">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
              alt="MKT Medical Solutions corporate partner facility"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Absolute Quote badge at bottom corner */}
          <div className="absolute -bottom-6 -start-4 sm:start-4 bg-[#001E40] border border-[#C3C6D1]/20 p-6 max-w-[320px] rounded shadow-2xl text-start">
            <p className="font-sans text-xs sm:text-sm text-white italic leading-relaxed">
              {lang === "EN"
                ? "“Excellence in healthcare infrastructure delivery, complying strictly with SFDA and ISO-13485 quality guidelines.”"
                : "“نصنع التميز في تسليم البنية التحتية للرعاية الصحية بالالتزام التام بمتطلبات هيئة الغذاء والدواء وشهادة آيزو ١٣٤٨٥ العالمية.”"}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-6 h-[2px] bg-[#165DB2]" />
              <span className="font-mono text-[9px] text-[#A7C8FF] uppercase tracking-widest font-semibold">
                {lang === "EN" ? "MKT EXECUTIVE BOARD" : "مجلس إدارة إم كي تي"}
              </span>
            </div>
          </div>

        </motion.div>

      </motion.div>
    </motion.section>
  );
}
