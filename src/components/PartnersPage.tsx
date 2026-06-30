import { motion } from "motion/react";
import { usePartners } from "../hooks/usePartners";
import { ArrowRight, Shield, Microscope, Eye, Hospital, TestTube, Stethoscope, Quote, Star, Building2 } from "lucide-react";
import * as Icons from "./Icons";

interface PartnersPageProps {
  lang: "EN" | "AR";
  onNavigateHomeSection: (id: string) => void;
}

export default function PartnersPage({ lang, onNavigateHomeSection }: PartnersPageProps) {
  const { partners, loading } = usePartners();

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <Building2 className="w-8 h-8" />;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-8 h-8" />;
    }
    return <Building2 className="w-8 h-8" />;
  };

  // Group partners by category name
  const governmentPartners = partners.filter(p => p.category?.name?.toUpperCase() === "GOVERNMENT");
  const healthcarePartners = partners.filter(p => p.category?.name?.toUpperCase() === "HEALTHCARE");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="w-full bg-[#F7F9FB] flex flex-col relative text-start pb-24">
      {/* Background Gradients from Figma */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `
            radial-gradient(141.42% 141.42% at 0% 0%, rgba(22, 93, 178, 0.05) 0%, rgba(22, 93, 178, 0) 50%), 
            radial-gradient(141.42% 141.42% at 100% 100%, rgba(0, 160, 160, 0.05) 0%, rgba(0, 160, 160, 0) 50%)
          `
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 w-full z-10 flex flex-col gap-24">
        
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6 max-w-3xl"
        >
          <span className="font-mono text-xs font-medium tracking-[1.2px] text-[#165DB2] uppercase">
            {lang === "EN" ? "OUR ECOSYSTEM" : "منظومتنا"}
          </span>
          <h1 className="font-sans font-bold text-4xl md:text-5xl text-[#001E40] tracking-tight leading-tight">
            {lang === "EN" ? "Partnerships Built on Unwavering Trust." : "شراكات مبنية على ثقة لا تتزعزع."}
          </h1>
          <p className="font-sans text-lg text-[#43474F] leading-relaxed mt-2">
            {lang === "EN" 
              ? "MKT collaborates with the world’s most critical institutions. From national security departments to leading medical research centers, we provide the technical foundation that supports mission-critical operations and life-saving forensic analysis." 
              : "تتعاون MKT مع المؤسسات الأكثر أهمية وحيوية في العالم. من إدارات الأمن القومي إلى مراكز الأبحاث الطبية الرائدة، نحن نوفر الأساس التقني الذي يدعم العمليات الحرجة والتحليلات الجنائية التي تنقذ الأرواح."}
          </p>
        </motion.section>

        {/* Partner Grid Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-16 w-full"
        >
          {/* Government Category */}
          <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-[1px] bg-[#C3C6D1]" />
              <span className="font-mono text-sm font-medium tracking-[1.4px] text-[#43474F] uppercase">
                {lang === "EN" ? "GOVERNMENT" : "القطاع الحكومي"}
              </span>
              <div className="flex-1 h-[1px] bg-[#C3C6D1]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full py-12 text-center text-gray-500">Loading partners...</div>
              ) : governmentPartners.map((partner) => {
                return (
                  <motion.div 
                    variants={itemVariants}
                    key={partner.id} 
                    className="flex flex-col items-center justify-center p-10 bg-white border border-[#C3C6D1] shadow-sm hover:shadow-md transition-shadow min-h-[256px] text-center gap-6 group"
                  >
                    <div className="w-24 h-24 bg-[#ECEEF0] rounded-xl flex items-center justify-center group-hover:bg-[#165DB2]/10 transition-colors overflow-hidden">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                      ) : (
                        <div className="text-[#001E40] group-hover:text-[#165DB2] transition-colors">
                          {renderIcon(partner.iconName)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <h3 className="font-sans font-semibold text-xl text-[#191C1E]">
                        {lang === "EN" ? partner.name : (partner.nameAr || partner.name)}
                      </h3>
                      <span className="font-mono text-xs font-medium tracking-[0.6px] text-[#43474F] uppercase">
                        {lang === "EN" ? partner.category?.name : (partner.category?.nameAr || partner.category?.name)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Healthcare Category */}
          <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-[1px] bg-[#C3C6D1]" />
              <span className="font-mono text-sm font-medium tracking-[1.4px] text-[#43474F] uppercase">
                {lang === "EN" ? "HEALTHCARE" : "الرعاية الصحية"}
              </span>
              <div className="flex-1 h-[1px] bg-[#C3C6D1]" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loading ? (
                <div className="col-span-full py-12 text-center text-gray-500">Loading partners...</div>
              ) : healthcarePartners.map((partner) => {
                return (
                  <motion.div 
                    variants={itemVariants}
                    key={partner.id} 
                    className="flex flex-col items-center justify-center p-10 bg-white border border-[#C3C6D1] shadow-sm hover:shadow-md transition-shadow min-h-[256px] text-center gap-6 group"
                  >
                    <div className="w-24 h-24 bg-[#ECEEF0] rounded-xl flex items-center justify-center group-hover:bg-[#165DB2]/10 transition-colors overflow-hidden">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                      ) : (
                        <div className="text-[#001E40] group-hover:text-[#165DB2] transition-colors">
                          {renderIcon(partner.iconName)}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                      <h3 className="font-sans font-semibold text-xl text-[#191C1E]">
                        {lang === "EN" ? partner.name : (partner.nameAr || partner.name)}
                      </h3>
                      <span className="font-mono text-xs font-medium tracking-[0.6px] text-[#43474F] uppercase">
                        {lang === "EN" ? partner.category?.name : (partner.category?.nameAr || partner.category?.name)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

      </div>

      {/* Trust Pillars Section (Dark Blue Background) */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="w-full bg-[#001E40] mt-24 py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-8 text-start">
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight">
              {lang === "EN" ? "The Pillars of Our Alliances" : "ركائز تحالفاتنا"}
            </h2>
            
            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-start">
                <Star className="w-6 h-6 text-[#7FF5F4] shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-semibold text-xl md:text-2xl text-white">
                    {lang === "EN" ? "Uncompromising Quality" : "جودة لا تقبل المساومة"}
                  </h4>
                  <p className="font-sans text-base text-[#799DD6] leading-relaxed">
                    {lang === "EN" 
                      ? "Every project undergoes rigorous validation processes, guaranteeing that the technical solutions deployed meet the strictest global and local compliance standards."
                      : "يخضع كل مشروع لعمليات تحقق صارمة، مما يضمن أن الحلول التقنية المنتشرة تلبي أكثر معايير الامتثال العالمية والمحلية صرامة."}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <Star className="w-6 h-6 text-[#7FF5F4] shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <h4 className="font-sans font-semibold text-xl md:text-2xl text-white">
                    {lang === "EN" ? "Dedicated Lifecycle Support" : "دعم مخصص طوال دورة الحياة"}
                  </h4>
                  <p className="font-sans text-base text-[#799DD6] leading-relaxed">
                    {lang === "EN"
                      ? "We remain by our partners' side from initial conceptualization through deployment, and far into the ongoing maintenance and evolution of their critical infrastructure."
                      : "نبقى بجانب شركائنا منذ التصور الأولي وحتى النشر، وإلى ما هو أبعد من ذلك في الصيانة المستمرة والتطور للبنية التحتية الحيوية الخاصة بهم."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px] bg-[#003366] border border-[#799DD6]/20 rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" 
              alt="Strategic Alliance" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
            />
            {/* Gradient Overlay matching Figma */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001E40] via-[#001E40]/50 to-transparent opacity-90" />
            
            <div className="absolute bottom-8 left-8 right-8 flex flex-col gap-2">
              <p className="font-mono italic font-medium text-sm text-[#7FF5F4] tracking-[0.7px] leading-relaxed">
                {lang === "EN" 
                  ? "\"Security is not a feature, it is the foundation of every handshake we make.\""
                  : "\"الأمان ليس مجرد ميزة، بل هو الأساس لكل شراكة نعقدها.\""}
              </p>
              <span className="font-mono font-medium text-xs text-white opacity-70 tracking-[0.6px]">
                {lang === "EN" ? "— Technical Directorate, MKT" : "— الإدارة الفنية، MKT"}
              </span>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Collaboration CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#001E40] tracking-tight mb-6">
          {lang === "EN" ? "Ready to Elevate Your Infrastructure?" : "هل أنت مستعد للارتقاء ببنيتك التحتية؟"}
        </h2>
        <p className="font-sans text-lg text-[#43474F] max-w-2xl leading-relaxed mb-10">
          {lang === "EN"
            ? "Connect with our engineering experts to discuss customized deployment plans tailored to your specific organizational needs."
            : "تواصل مع خبرائنا الهندسيين لمناقشة خطط النشر المخصصة والمصممة خصيصاً لتلبية الاحتياجات التنظيمية الخاصة بك."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => onNavigateHomeSection("contact")}
            className="flex items-center justify-center py-4 px-8 bg-[#001E40] hover:bg-[#165DB2] text-white font-mono font-medium text-sm tracking-[0.7px] rounded transition-colors"
          >
            {lang === "EN" ? "CONTACT SALES" : "اتصل بالمبيعات"}
          </button>
          <button 
            onClick={() => onNavigateHomeSection("services")}
            className="flex items-center justify-center py-4 px-8 bg-transparent border border-[#165DB2] text-[#165DB2] hover:bg-[#165DB2]/5 font-mono font-medium text-sm tracking-[0.7px] rounded transition-colors"
          >
            {lang === "EN" ? "VIEW CAPABILITIES" : "عرض القدرات التقنية"}
          </button>
        </div>
      </motion.section>

    </div>
  );
}
