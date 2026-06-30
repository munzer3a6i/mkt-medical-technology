import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useEquipment } from "../hooks/useEquipment";
import { 
  Search, 
  SlidersHorizontal, 
  PhoneCall, 
  FileCheck, 
  ShieldCheck, 
  TrendingUp, 
  ShoppingCart, 
  Check, 
  HelpCircle,
  Truck,
  Award,
  Layers
} from "lucide-react";

interface EquipmentPageProps {
  lang: "EN" | "AR";
  onNavigateHomeSection: (sectionId: string) => void;
  onInquireProduct: (productName: string) => void;
}

export default function EquipmentPage({ 
  lang, 
  onNavigateHomeSection,
  onInquireProduct
}: EquipmentPageProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  
  const { equipment, loading } = useEquipment();

  // Helper for translating categories
  const getCategoryLabel = (cat: string) => {
    if (cat === "ALL") return lang === "EN" ? "ALL" : "الكل";
    const prod = equipment.find(p => p.category?.name === cat);
    if (prod) {
      return lang === "EN" ? prod.category?.name : (prod.category?.nameAr || prod.category?.name);
    }
    return cat;
  };

  // Get unique categories of products
  const categories = useMemo(() => {
    const list = new Set(equipment.map(p => p.category?.name).filter(Boolean) as string[]);
    return ["ALL", ...Array.from(list)];
  }, [equipment]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = equipment.filter(p => {
      const q = searchQuery.toLowerCase();
      const catName = p.category?.name || "";
      const catNameAr = p.category?.nameAr || "";
      const matchesSearch = 
        p.name.toLowerCase().includes(q) ||
        (p.nameAr || "").toLowerCase().includes(q) ||
        catName.toLowerCase().includes(q) ||
        catNameAr.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.descriptionAr || "").toLowerCase().includes(q);
      
      const matchesCategory = selectedCategory === "ALL" || catName === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => (a.category?.name || "").localeCompare(b.category?.name || ""));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, equipment]);

  // Labels for localized support
  const labels = {
    heroTitle: lang === "EN" ? "Precision Medical Equipment & Systems" : "أجهزة ومعدات طبية عالية الدقة",
    heroDesc: lang === "EN" 
      ? "Discover MKT's complete catalog of clinical-grade healthcare equipment and forensic instrumentation built for safety and durability."
      : "اكتشف كتالوج شركة إم كي تي الكامل للأجهزة والمعدات الطبية وأدوات التحقيق الجنائي المصممة لضمان السلامة والمتانة.",
    placeholder: lang === "EN" ? "Search by model, SKU or specification..." : "ابحث بالموديل، رمز القطعة (SKU) أو المواصفات...",
    filterTitle: lang === "EN" ? "CATEGORIES" : "الفئات",
    sortTitle: lang === "EN" ? "SORT BY" : "ترتيب حسب",
    supportTitle: lang === "EN" ? "Technical Support" : "الدعم الفني والضمان",
    supportDesc: lang === "EN"
      ? "MKT provides 24/7 onsite technical assistance and preventive calibration for all catalog items."
      : "توفر شركة MKT الدعم الفني والمساعدة الموقعية ومعايرة الأجهزة الوقائية على مدار الساعة لجميع القطع.",
    bulkTitle: lang === "EN" ? "Institutional Bulk Procurement" : "المشتريات والتوريدات المؤسسية الكبرى",
    bulkDesc: lang === "EN"
      ? "MKT offers specialized fulfillment services for hospital networks, medical universities, and national health departments. Our logistics infrastructure ensures compliant delivery of mission-critical equipment at scale."
      : "تقدم MKT خدمات إمداد وتوريد متخصصة لشبكات المستشفيات والجامعات الطبية وإدارات الصحة الوطنية. تضمن بنيتنا التحتية اللوجستية تسليم الأجهزة الحساسة بدقة متناهية.",
    bulkListItem1: lang === "EN" ? "Customized institutional pricing models" : "نماذج تسعير مؤسسية مخصصة ومنافسة",
    bulkListItem2: lang === "EN" ? "Turnkey clinical installation & certification" : "تركيب وتشغيل متكامل وتسليم المفتاح مع شهادات الجودة",
    bulkListItem3: lang === "EN" ? "Local Riyadh inventory for express parts shipping" : "مخزون محلي بالرياض للشحن الفوري لقطع الغيار",
    requestBulkBtn: lang === "EN" ? "REQUEST B2B PROCUREMENT PLAN" : "طلب خطة توريد مؤسسية متكاملة",
    inquireBtn: lang === "EN" ? "INQUIRE SKU" : "استفسار عن القطعة",
    addBtn: lang === "EN" ? "ADD TO INQUIRY LIST" : "إضافة لقائمة الاستفسار",
    addedBtn: lang === "EN" ? "IN LIST" : "في القائمة",
    specificationsTitle: lang === "EN" ? "Specifications" : "المواصفات الفنية",
    resultsCount: lang === "EN" ? "Showing {count} products" : "تم العثور على {count} منتج فني",
    sidebarHelpTitle: lang === "EN" ? "Need Immediate Advice?" : "هل تحتاج لمساعدة فورية؟",
    sidebarHelpDesc: lang === "EN" 
      ? "Our clinical engineering team can help configure custom equipment packages." 
      : "يمكن لفريق المهندسين الطبيين لدينا مساعدتك في تخطيط وتهيئة حزم الأجهزة والقطع."
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#F7F9FB] text-start"
    >
      
      {/* 1. Header - Hero Section */}
      <section className="bg-[#003366] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-6">
          <h1 className="font-sans font-bold text-3xl sm:text-5xl tracking-tight text-white max-w-4xl">
            {labels.heroTitle}
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#799DD6] max-w-2xl leading-relaxed">
            {labels.heroDesc}
          </p>

          {/* Search & Filter Bar */}
          <div className="w-full max-w-4xl bg-white p-2 rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center mt-4">
            <div className="md:col-span-6 flex items-center bg-[#F2F4F6] rounded px-3 py-1.5 gap-2 border border-gray-200">
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={labels.placeholder}
                className="w-full bg-transparent focus:outline-none text-sm text-gray-800 placeholder-gray-500 font-sans"
              />
            </div>

            {/* Category Dropdown Filter */}
            <div className="md:col-span-3 bg-[#F2F4F6] rounded px-3 py-1.5 border border-gray-200 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500 mr-2 shrink-0">{labels.filterTitle}:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-mono text-gray-800 w-full cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {getCategoryLabel(cat)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown Filter */}
            <div className="md:col-span-3 bg-[#F2F4F6] rounded px-3 py-1.5 border border-gray-200 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-500 mr-2 shrink-0">{labels.sortTitle}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "category")}
                className="bg-transparent focus:outline-none text-xs font-mono text-gray-800 w-full cursor-pointer"
              >
                <option value="name">{lang === "EN" ? "NAME" : "الاسم"}</option>
                <option value="category">{lang === "EN" ? "CATEGORY" : "الفئة"}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Catalog Content & Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 flex flex-col gap-8">
            
            {/* Quick Categories filter */}
            <div className="bg-white border border-[#C3C6D1] rounded p-6 flex flex-col gap-4 text-start">
              <h3 className="font-mono text-xs font-bold text-[#001E40] border-b border-[#C3C6D1] pb-2 tracking-wider">
                {lang === "EN" ? "FILTER BY DIVISION" : "فلترة حسب الأقسام"}
              </h3>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center justify-between text-xs font-sans py-1.5 px-2 rounded transition-all text-start ${
                      selectedCategory === cat 
                        ? "bg-[#001E40] text-white font-bold" 
                        : "text-[#43474F] hover:bg-[#F2F4F6]"
                    }`}
                  >
                    <span>{getCategoryLabel(cat)}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Support Box */}
            <div className="bg-[#F2F4F6] border border-[#C3C6D1] rounded p-6 flex flex-col gap-4 text-start">
              <h4 className="font-sans font-bold text-lg text-[#001E40] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#165DB2]" />
                <span>{labels.supportTitle}</span>
              </h4>
              <p className="font-sans text-xs text-[#43474F] leading-relaxed">
                {labels.supportDesc}
              </p>
              <button
                onClick={() => onNavigateHomeSection("contact")}
                className="text-xs font-mono font-bold text-[#165DB2] flex items-center gap-1 hover:underline"
              >
                <span>{lang === "EN" ? "REQUEST ASSISTANCE" : "طلب استشارة هندسية"}</span>
                <span className="text-sm rtl:rotate-180">➔</span>
              </button>
            </div>

            {/* Immediate Help Box */}
            <div className="bg-white border border-[#C3C6D1] rounded p-6 flex flex-col gap-4 text-start">
              <h4 className="font-sans font-bold text-sm text-[#001E40] flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#165DB2]" />
                <span>{labels.sidebarHelpTitle}</span>
              </h4>
              <p className="font-sans text-xs text-[#43474F] leading-relaxed">
                {labels.sidebarHelpDesc}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("ALL");
                  setSearchQuery("");
                }}
                className="text-xs font-mono text-gray-500 hover:underline"
              >
                {lang === "EN" ? "RESET ALL FILTERS" : "إعادة تعيين الفلاتر"}
              </button>
            </div>

          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            
            {/* Results bar */}
            <div className="flex items-center justify-between border-b border-[#C3C6D1] pb-4">
              <span className="text-xs font-mono font-bold text-gray-500">
                {labels.resultsCount.replace("{count}", filteredProducts.length.toString())}
              </span>
              <span className="text-xs font-mono text-gray-400">{lang === "EN" ? "ISO 13485 CERTIFIED" : "معتمد بشهادة آيزو ١٣٤٨٥"}</span>
            </div>

            {/* Grid */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProducts.map((p) => {
                return (
                  <motion.article 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
                    }}
                    key={p.id}
                    className="bg-white border border-[#C3C6D1] rounded-sm overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Image container */}
                      <div className="h-48 bg-gray-100 overflow-hidden relative flex items-center justify-center">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 font-sans text-sm font-medium">No Image</span>
                        )}
                        <span className="absolute top-3 start-3 bg-[#002323] text-white font-mono text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-sm">
                          {lang === "EN" ? p.category?.name : (p.category?.nameAr || p.category?.name)}
                        </span>
                      </div>

                      {/* Info & Specifications */}
                      <div className="p-6 text-start flex flex-col gap-4">
                        <div>
                          <h3 className="font-sans font-bold text-lg text-[#001E40] tracking-tight leading-snug">
                            {lang === "EN" ? p.name : (p.nameAr || p.name)}
                          </h3>
                          <p className="font-sans text-xs text-gray-500 font-mono tracking-wide mt-1 uppercase text-[#6CA3FD]">
                            {lang === "EN" ? `${p.category?.name} DIVISION SKU` : `رمز فئة ${p.category?.nameAr || p.category?.name}`}
                          </p>
                        </div>

                        <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                          {lang === "EN" ? p.description : (p.descriptionAr || p.description)}
                        </p>

                        {/* Specs list */}
                        <div className="bg-[#F7F9FB] border border-[#C3C6D1]/40 rounded p-4 flex flex-col gap-2">
                          <h4 className="text-[10px] font-mono font-bold text-gray-500 tracking-wider uppercase border-b border-gray-200 pb-1">
                            {labels.specificationsTitle}
                          </h4>
                          <ul className="flex flex-col gap-1.5 text-xs text-[#43474F] list-disc ps-4">
                            {(lang === "EN" ? p.specifications : (p.specificationsAr || p.specifications)).map((spec, sidx) => (
                              <li key={sidx} className="leading-tight">
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons footer */}
                    <div className="p-6 pt-0 border-t border-[#ECEEF0] flex gap-3 mt-4">
                      <button
                        onClick={() => onInquireProduct(p.name)}
                        className="relative overflow-hidden group w-full bg-[#001E40] text-white font-mono text-xs font-bold py-3 rounded text-center tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                        <span className="relative z-10">{lang === "EN" ? "ENQUIRE NOW" : "تقديم استفسار فني"}</span>
                      </button>
                    </div>

                  </motion.article>
                );
              })}
            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. Bulk Procurement Section */}
      <section className="bg-[#ECEEF0] border-t border-[#C3C6D1] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6 text-start">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight leading-tight">
              {labels.bulkTitle}
            </h2>
            <p className="font-sans text-base text-[#43474F] leading-relaxed">
              {labels.bulkDesc}
            </p>

            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-[#6CA3FD] text-white rounded-full flex items-center justify-center font-bold text-xs">✓</span>
                <span className="font-sans text-sm text-[#191C1E]">{labels.bulkListItem1}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-[#6CA3FD] text-white rounded-full flex items-center justify-center font-bold text-xs">✓</span>
                <span className="font-sans text-sm text-[#191C1E]">{labels.bulkListItem2}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 bg-[#6CA3FD] text-white rounded-full flex items-center justify-center font-bold text-xs">✓</span>
                <span className="font-sans text-sm text-[#191C1E]">{labels.bulkListItem3}</span>
              </li>
            </ul>

            <button
              onClick={() => onNavigateHomeSection("contact")}
              className="relative overflow-hidden group bg-[#165DB2] text-white font-mono text-xs font-bold py-4 px-8 rounded tracking-wider uppercase cursor-pointer shadow max-w-sm"
            >
              <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
              <span className="relative z-10">{labels.requestBulkBtn}</span>
            </button>
          </div>

          {/* Illustrative block */}
          <div className="h-[400px] bg-white border border-[#C3C6D1] shadow-2xl rounded-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1582719471384-894fbb16e024?auto=format&fit=crop&q=80&w=600"
              alt="Medical Logistics Warehouse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001E40]/90 via-[#001E40]/20 to-transparent p-8 flex flex-col justify-end text-start text-white">
              <span className="font-mono text-xs text-[#7FF5F4] tracking-widest font-bold mb-1">
                {lang === "EN" ? "MKT LOGISTICS CENTER" : "مركز إم كي تي للخدمات اللوجستية"}
              </span>
              <h4 className="font-sans font-bold text-lg">
                {lang === "EN" ? "Express Clinical Warehousing Riyadh" : "المستودعات الطبية السريعة بالرياض"}
              </h4>
            </div>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
