import { useState } from "react";
import { WORK_PROCESS_STEPS } from "../data";
import { Check, ArrowRight, ClipboardList } from "lucide-react";
import { motion } from "motion/react";

interface WorkProcessProps {
  lang: "EN" | "AR";
  onExploreDetailed?: () => void;
}

export default function WorkProcess({ lang, onExploreDetailed }: WorkProcessProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white border-b border-[#C3C6D1] py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
            {lang === "EN" ? "LIFECYCLE PIPELINE" : "منهجية العمل المتكاملة"}
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight">
            {lang === "EN" ? "Our Work Process" : "آلية العمل ومراحل التنفيذ"}
          </h2>
          <p className="max-w-2xl font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
            {lang === "EN"
              ? "We deliver guaranteed clinical readiness by guiding medical infrastructure through a rigorous, transparent four-stage pipeline."
              : "نضمن جاهزية التشغيل السريرية التامة عبر مرافقة البنية التحتية الطبية في أربعة مراحل متكاملة من التخطيط والتركيب والصيانة."}
          </p>
        </div>

        {/* 4 Steps Row / Pipeline */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="relative grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-[#C3C6D1]/50 -z-10" />

          {WORK_PROCESS_STEPS.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                key={step.number}
                id={`process-step-${step.number}`}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center text-center p-6 bg-white rounded-sm border transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? "border-[#165DB2] shadow-md bg-slate-50/40 translate-y-[-4px]"
                    : "border-transparent hover:border-[#C3C6D1]/60"
                }`}
              >
                {/* Step circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center font-sans font-bold text-lg mb-6 transition-all duration-300 border-4 ${
                    isCurrent
                      ? "bg-[#165DB2] text-white border-[#D6E3FF] scale-110 shadow"
                      : "bg-[#001E40] text-white border-white"
                  }`}
                >
                  {step.number}
                </div>

                {/* Step Title (Heading 4) */}
                <h3 className="font-sans font-semibold text-lg text-[#001E40] mb-2">
                  {lang === "EN" ? step.title : (
                    idx === 0 ? "الاستكشاف" :
                    idx === 1 ? "التصميم" :
                    idx === 2 ? "التركيب والتشغيل" : "الدعم والتشغيل"
                  )}
                </h3>

                {/* Step Description */}
                <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                  {lang === "EN" ? step.description : (
                    idx === 0 ? "دراسة احتياجات المنشأة الطبية والمساحات والمواصفات الفنية." :
                    idx === 1 ? "تخطيط وبناء المخططات ثلاثية الأبعاد ومخططات سير العمل المعقم." :
                    idx === 2 ? "تأمين سلسلة الإمداد ومعايرة الأجهزة وتركيب البنية التحتية بدقة." :
                    "تقديم الدعم الفني على مدار الساعة وشهادات المعايرة الوقائية."
                  )}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Detail Card based on Active Step */}
        <div className="bg-[#F2F4F6] border border-[#C3C6D1] p-6 sm:p-8 rounded text-start">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#C3C6D1]/60 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-5 h-5 text-[#165DB2]" />
              <span className="font-mono text-xs font-bold text-[#165DB2] tracking-wider uppercase">
                {lang === "EN" ? "PHASE CHECKLIST" : "قائمة التحقق للمرحلة الحالية"}
              </span>
            </div>
            <span className="font-mono text-xs text-[#43474F]">
              {lang === "EN" 
                ? `ACTIVE PHASE: ${WORK_PROCESS_STEPS[activeStep].number} / 04`
                : `المرحلة النشطة: ${WORK_PROCESS_STEPS[activeStep].number} / ٠٤`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORK_PROCESS_STEPS[activeStep].details.map((detail, i) => (
              <div
                key={i}
                className="bg-white p-4 border-s-4 border-[#001E40] rounded-e flex items-start gap-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#191C1E] leading-relaxed">
                  {lang === "EN" ? detail : (
                    activeStep === 0 ? [
                      "تقييم هندسي دقيق لموقع ومقاييس العمل الميكانيكي",
                      "مطابقة كاملة لتعليمات وزارة الصحة (MOH) والمعايير السعودية",
                      "تحديد دراسات الميزانية المبدئية ومخططات الهندسة المخصصة"
                    ][i] :
                    activeStep === 1 ? [
                      "تصميم حجمي ثلاثي الأبعاد لغرف العمليات وأقسام التعقيم CSSD",
                      "مخططات حركة مرسومة لضمان عزل تام للمناطق الملوثة والسليمة",
                      "حساب القدرات الاستيعابية واحتياجات الغازات والطاقة للأجهزة"
                    ][i] :
                    activeStep === 2 ? [
                      "نقل مبرد وآمن لجميع الأجهزة والمستلزمات الحساسة",
                      "تثبيت وتكامل ميكانيكي وكهربائي ومعايرة الحساسات في الموقع",
                      "عمليات تشغيل تجريبية معتمدة واختبارات الضغط والحرارة"
                    ][i] : [
                      "ضمان أوقات استجابة سريعة جداً للصيانة في كافة مناطق المملكة",
                      "زيارات دورية نصف سنوية للمعايرة والوقاية مع توثيق الشهادات المعيارية",
                      "مخزون وفير من قطع الغيار الأصلية في مستودعاتنا بالرياض لسرعة التلبية"
                    ][i]
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {onExploreDetailed && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={onExploreDetailed}
              id="explore-detailed-process-btn"
              className="relative overflow-hidden group flex items-center gap-2 bg-[#165DB2] text-white font-mono text-xs font-bold px-8 py-4 rounded shadow hover:shadow-md cursor-pointer uppercase tracking-wider"
            >
              <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10 flex items-center gap-2">
                <span>{lang === "EN" ? "Explore Our Full Technical Process" : "استكشاف تفاصيل منهجية العمل الفنية"}</span>
                <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:rotate-180">➔</span>
              </span>
            </button>
          </div>
        )}

      </div>
    </motion.section>
  );
}
