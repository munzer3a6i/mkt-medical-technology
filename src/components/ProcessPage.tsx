import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ClipboardList, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  Check, 
  TrendingUp, 
  ArrowRight,
  FileText,
  Clock,
  ShieldAlert,
  MapPin,
  Sparkles,
  PhoneCall
} from "lucide-react";

interface ProcessPageProps {
  lang: "EN" | "AR";
  onNavigateHomeSection: (sectionId: string) => void;
}

export default function ProcessPage({ lang, onNavigateHomeSection }: ProcessPageProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const labels = {
    tag: lang === "EN" ? "METHODOLOGY" : "منهجية العمل والتحقق",
    title: lang === "EN" ? "Our Process" : "مسار العمل الهندسي المتكامل",
    desc: lang === "EN"
      ? "Our process is designed specifically for healthcare administrators and security personnel who require zero-failure environments. We don't just deliver; we validate."
      : "تم تصميم آلية العمل لدينا خصيصاً لمدراء الرعاية الصحية ومسؤولي الأمن الذين يطلبون بيئات تشغيل خالية من الأخطاء تماماً. نحن لا نقدم الأجهزة فحسب، بل نتحقق ونعاير ونضمن جودة التشغيل الاستباقية.",
    hubsTitle: lang === "EN" ? "Operational Hubs & Forensic Integrity" : "مراكز التشغيل ونظام الجودة الجنائي",
    hubsDesc: lang === "EN"
      ? "Centralized control for multi-site monitoring and deployment coordination to guarantee safety and compliance."
      : "تحكم مركزي لإدارة ومراقبة مواقع متعددة وتنسيق التوريد والتركيب لضمان مستويات سلامة قصوى ومطابقة تامة للمواصفات.",
    hub1Title: lang === "EN" ? "Operational Hubs" : "مراكز التنسيق والتشغيل الميداني",
    hub1Desc: lang === "EN"
      ? "Centralized control for multi-site monitoring and deployment coordination."
      : "إشراف مركزي متكامل لمراقبة جودة المشاريع في مناطق متعددة وتأمين سرعة الاستجابة.",
    hub2Title: lang === "EN" ? "Forensic Evaluation" : "التقييم الفني والجنائي الدقيق",
    hub2Desc: lang === "EN"
      ? "Advanced diagnostics to ensure structural and digital integrity at every layer."
      : "تشخيص متقدم واختبارات فنية دقيقة لضمان السلامة الهيكلية والأداء في غرف العمليات والتعقيم الجراحي.",
    ctaTitle: lang === "EN" ? "Need a Zero-Failure Compliance Roadmap?" : "هل تبحث عن خارطة طريق لضمان خلو منشأتك من الأخطاء؟",
    ctaDesc: lang === "EN"
      ? "Connect directly with our clinical integration team in Riyadh. We provide technical blueprints compliant with SFDA and ISO guidelines."
      : "تواصل مباشرة مع فريق دمج التكنولوجيا الطبية في الرياض. نوفر لك المخططات الفنية المتوافقة كلياً مع اشتراطات الغذاء والدواء والمعايير الدولية.",
    ctaBtnPrimary: lang === "EN" ? "REQUEST TECHNICAL BLUEPRINT" : "طلب مخطط فني متكامل",
    ctaBtnSecondary: lang === "EN" ? "TALK TO CLINICAL ENGINEER" : "التحدث مع مهندس طبي متخصص",
    phasesTitle: lang === "EN" ? "PHASE DETAILED BREAKDOWN" : "تفصيل مراحل ومخرجات خطة العمل"
  };

  const steps = [
    {
      number: "01",
      title: lang === "EN" ? "Analyze" : "دراسة وتدقيق الاحتياجات",
      desc: lang === "EN"
        ? "Exhaustive site evaluation and infrastructure audit. We identify critical vulnerabilities and operational bottlenecks through data-driven forensic analysis."
        : "تقييم شامل للموقع وتدقيق البنية التحتية. نحدد الثغرات التشغيلية واحتياجات الغازات الطبية والطاقة والمساحات المتاحة بدقة.",
      highlights: [
        lang === "EN" ? "Site constraints mapping" : "رسم خرائط قيود الموقع والمنشأة",
        lang === "EN" ? "Gas & power audits" : "تدقيق شبكات الغازات الطبية والطاقة الكهروميكانيكية"
      ],
      icon: <ClipboardList className="w-5 h-5 text-[#001E40]" />,
      bg: "bg-[#D5E3FF]"
    },
    {
      number: "02",
      title: lang === "EN" ? "Design Solution" : "تصميم وتخطيط الحلول",
      desc: lang === "EN"
        ? "Architecting high-tech minimal systems tailored to your specific requirements. We prioritize logical information flow and structural rigidity."
        : "بناء وتصميم مخططات معيارية مخصصة وعالية التقنية. نولي الأولوية لتدفق الحركة السلس لمنع العدوى والتداخل التشغيلي.",
      highlights: [
        lang === "EN" ? "3D sterile workflow design" : "تصميم ثلاثي الأبعاد لغرف سير العمل المعقم",
        lang === "EN" ? "Structural rigidity planning" : "تخطيط المتانة ومواقع تركيب الأجهزة الحساسة"
      ],
      icon: <Cpu className="w-5 h-5 text-[#165DB2]" />,
      bg: "bg-[#6CA3FD]/20"
    },
    {
      number: "03",
      title: lang === "EN" ? "Implement" : "التوريد والتركيب والتشغيل",
      desc: lang === "EN"
        ? "Precision execution under mission-critical standards. Our team ensures seamless integration with existing enterprise security and health systems."
        : "تنفيذ دقيق بمعايير جودة صارمة للغاية. يضمن فريقنا التركيب السلس والتشغيل التجريبي للأجهزة وربطها مع أنظمة المنشأة القائمة.",
      highlights: [
        lang === "EN" ? "Calibration on-site" : "معايرة واختبار الحساسات ميدانياً",
        lang === "EN" ? "Enterprise systems link" : "الربط التقني والفني مع أنظمة إدارة المستشفيات"
      ],
      icon: <Wrench className="w-5 h-5 text-[#004F4F]" />,
      bg: "bg-[#60D8D8]/20"
    },
    {
      number: "04",
      title: lang === "EN" ? "Support & Validate" : "الدعم الفني والتحقق الوقائي",
      desc: lang === "EN"
        ? "Continuous monitoring and forensic-grade validation. We provide 24/7 technical oversight to ensure system integrity and compliance."
        : "مراقبة مستمرة وتحقق دوري من فئة جودة الطب الشرعي. نوفر دعماً فنياً ووقائياً على مدار الساعة لضمان استمرارية عمل الأجهزة.",
      highlights: [
        lang === "EN" ? "24/7 Technical oversight" : "رقابة ودعم فني على مدار الساعة",
        lang === "EN" ? "Preventive re-certification" : "معايرة وقائية دورية وشهادات آيزو"
      ],
      icon: <ShieldCheck className="w-5 h-5 text-[#BA1A1A]" />,
      bg: "bg-[#FFDAD6]/20"
    }
  ];

  const breakdownPhases = [
    {
      phase: lang === "EN" ? "PHASE 1: AUDITING" : "المرحلة الأولى: الفحص الفني",
      duration: lang === "EN" ? "Weeks 1-2" : "الأسبوع الأول والثاني",
      deliverable: lang === "EN" ? "Comprehensive Site Readiness Report" : "تقرير جاهزية الموقع الشامل",
      status: lang === "EN" ? "COMPLETED" : "مكتمل",
      color: "teal"
    },
    {
      phase: lang === "EN" ? "PHASE 2: 3D MODELING" : "المرحلة الثانية: النمذجة ثلاثية الأبعاد",
      duration: lang === "EN" ? "Weeks 3-4" : "الأسبوع الثالث والرابع",
      deliverable: lang === "EN" ? "AutoCAD & 3D Workflow Blueprints" : "مخططات أوتوكاد ومسارات غرف التعقيم ثلاثية الأبعاد",
      status: lang === "EN" ? "APPROVED" : "معتمد",
      color: "blue"
    },
    {
      phase: lang === "EN" ? "PHASE 3: CALIBRATION" : "المرحلة الثالثة: التركيب والمعايرة",
      duration: lang === "EN" ? "Weeks 5-8" : "الأسبوع الخامس إلى الثامن",
      deliverable: lang === "EN" ? "On-site Calibration & SFDA Logs" : "محاضر المعايرة الموقعية وسجلات ترخيص الغذاء والدواء",
      status: lang === "EN" ? "ACTIVE" : "نشط",
      color: "teal"
    },
    {
      phase: lang === "EN" ? "PHASE 4: OVERSIGHT" : "المرحلة الرابعة: المراقبة والتحقق",
      duration: lang === "EN" ? "Continuous" : "مستمر",
      deliverable: lang === "EN" ? "Preventive Recertification Program" : "برنامج شهادات التدقيق وإعادة المعايرة الوقائية",
      status: lang === "EN" ? "STANDBY" : "جاهز للتفعيل",
      color: "gray"
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
      
      {/* 1. Hero Section */}
      <section className="bg-white border-b border-[#C3C6D1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col gap-6 text-start">
            <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
              {labels.tag}
            </span>
            <h1 className="font-sans font-bold text-3xl sm:text-5xl text-[#001E40] tracking-tight leading-tight">
              {labels.title}
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#43474F] leading-relaxed max-w-2xl">
              {labels.desc}
            </p>
          </div>

          {/* Illustrative abstract vector/block with modern lines representing planning precision */}
          <div className="lg:col-span-5 bg-[#001E40] text-white p-8 rounded-lg border border-[#C3C6D1] shadow-lg flex flex-col gap-6 relative overflow-hidden min-h-[240px] justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-2xl" />
            
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-[#7FF5F4]" />
              <h3 className="font-sans font-bold text-lg text-white">
                {lang === "EN" ? "Rigid Validation Quality" : "معايير تحقق صارمة للغاية"}
              </h3>
            </div>
            <p className="font-sans text-sm text-[#A7C8FF] leading-relaxed">
              {lang === "EN" 
                ? "Every cubic meter of clinical space, from autoclave placements to cleanroom pressure nodes, is checked against rigorous SFDA and ISO limits."
                : "كل متر مكعب من المساحة الطبية، بدءاً من موقع وضع أجهزة التعقيم إلى نقاط ضغط الهواء النظيف، يتم فحصه وفق قيود ومعايير صارمة للغاية."}
            </p>
          </div>

        </div>
      </section>

      {/* 2. The 4-Step Workflow Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step) => (
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              key={step.number}
              className="bg-white border border-[#C3C6D1] rounded p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow transition-shadow text-start"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-xs font-bold text-[#737780] tracking-wider">
                    {step.number}
                  </span>
                  <div className={`w-10 h-10 ${step.bg} flex items-center justify-center rounded`}>
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-sans font-bold text-xl text-[#001E40] mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="border-t border-[#ECEEF0] pt-4 flex flex-col gap-2">
                {step.highlights.map((hl, hidx) => (
                  <div key={hidx} className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#001E40]">
                    <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Detailed Phase Breakdown Matrix */}
      <section className="bg-white border-t border-b border-[#C3C6D1] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          
          <div className="flex flex-col gap-2 text-start">
            <h2 className="font-sans font-bold text-2xl text-[#001E40] tracking-tight">
              {labels.phasesTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#43474F]">
              {lang === "EN"
                ? "Our step-by-step phases of engagement prevent delays, assure compliance, and maintain documentation transparency."
                : "تمنع مراحل التنفيذ الواضحة لدينا حدوث أي تأخير، وتضمن امتثال البنية التحتية، وتوفر شفافية كاملة للتقارير والشهادات."}
            </p>
          </div>

          {/* Breakdown Table */}
          <div className="w-full border border-[#C3C6D1] rounded overflow-hidden shadow-sm bg-[#F7F9FB] overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-start">
              <thead>
                <tr className="bg-[#003366] text-white">
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "ENGAGEMENT PHASE" : "مرحلة العمل والاتفاق"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "TIMELINE" : "الجدول الزمني التقديري"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start border-e border-[#C3C6D1]/20">
                    {lang === "EN" ? "CORE DELIVERABLE" : "المخرج الرئيسي للمرحلة"}
                  </th>
                  <th className="px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider text-start">
                    {lang === "EN" ? "QUALITY STATE" : "حالة التحقق"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C3C6D1]/60 bg-white">
                {breakdownPhases.map((phase, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? "bg-[#F8FAFC]" : "bg-white"}>
                    <td className="px-6 py-4 font-sans font-bold text-sm text-[#001E40] border-e border-[#C3C6D1]/40">
                      {phase.phase}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs sm:text-sm text-[#43474F] border-e border-[#C3C6D1]/40">
                      {phase.duration}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs sm:text-sm text-[#43474F] border-e border-[#C3C6D1]/40">
                      {phase.deliverable}
                    </td>
                    <td className="px-6 py-4">
                      {phase.color === "teal" ? (
                        <span className="inline-flex items-center bg-[#25ACAC]/10 border border-[#25ACAC]/30 text-[#25ACAC] text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                          {phase.status}
                        </span>
                      ) : phase.color === "blue" ? (
                        <span className="inline-flex items-center bg-[#165DB2]/10 border border-[#165DB2]/30 text-[#165DB2] text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                          {phase.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center bg-gray-100 text-gray-500 text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-gray-200">
                          {phase.status}
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

      {/* 4. Operational Hubs & Forensic Evaluation Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12">
        
        <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
          <h2 className="font-sans font-bold text-3xl text-[#001E40] tracking-tight">
            {labels.hubsTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
            {labels.hubsDesc}
          </p>
        </div>

        {/* Dual cards with high density details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Operational Hubs */}
          <div className="bg-white border border-[#C3C6D1] rounded-lg p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-start relative overflow-hidden">
            <div className="h-44 bg-gray-100 rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
                alt="Operational Control Centers and healthcare infrastructure management"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-sans font-bold text-xl text-[#001E40]">
                {labels.hub1Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                {labels.hub1Desc}
              </p>
            </div>
            <div className="mt-2 text-xs font-mono font-bold text-[#165DB2]">
              {lang === "EN" ? "RIYADH HEADQUARTERS & LOGISTICS HUBS" : "مقر الإدارة العامة والخدمات اللوجستية بالرياض"}
            </div>
          </div>

          {/* Card 2: Forensic Evaluation */}
          <div className="bg-white border border-[#C3C6D1] rounded-lg p-6 sm:p-8 shadow-sm flex flex-col gap-6 text-start relative overflow-hidden">
            <div className="h-44 bg-gray-100 rounded overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600"
                alt="Forensics diagnostics and clinical engineering testing"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="font-sans font-bold text-xl text-[#001E40]">
                {labels.hub2Title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                {labels.hub2Desc}
              </p>
            </div>
            <div className="mt-2 text-xs font-mono font-bold text-[#165DB2]">
              {lang === "EN" ? "ISO-17025 ACCREDITED FORENSIC AUDITING" : "تدقيق الأدلة الجنائية المعتمد بشهادة آيزو ١٧٠٢٥"}
            </div>
          </div>

        </div>

      </section>

      {/* 5. CTA Section */}
      <section className="bg-[#ECEEF0] border-t border-[#C3C6D1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white border border-[#C3C6D1] rounded-xl p-8 sm:p-12 shadow-xl text-center flex flex-col items-center gap-6">
          
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-bold text-2xl sm:text-3xl text-[#001E40] tracking-tight">
              {labels.ctaTitle}
            </h3>
            <p className="font-sans text-sm sm:text-base text-[#43474F] max-w-2xl leading-relaxed">
              {labels.ctaDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            <button
              onClick={() => onNavigateHomeSection("contact")}
              className="relative overflow-hidden group bg-[#001E40] text-white font-mono text-xs font-bold py-4 px-8 rounded-sm shadow tracking-wider uppercase cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10">{labels.ctaBtnPrimary}</span>
            </button>

            <button
              onClick={() => onNavigateHomeSection("contact")}
              className="relative overflow-hidden group border border-[#165DB2] text-[#165DB2] font-mono text-xs font-bold py-4 px-8 rounded-sm tracking-wider uppercase cursor-pointer"
            >
              <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-200">{labels.ctaBtnSecondary}</span>
            </button>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
