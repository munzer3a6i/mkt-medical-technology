import { useState } from "react";
import { useEquipment } from "../hooks/useEquipment";
import { Equipment as Product } from "../shared/types";
import { Check, ArrowRight, ShoppingCart, Info, X } from "lucide-react";
import { motion } from "motion/react";

interface EquipmentShopProps {
  lang: "EN" | "AR";
  onInquireProduct: (productName: string) => void;
  onExploreCatalog: () => void;
}

export default function EquipmentShop({
  lang,
  onInquireProduct,
  onExploreCatalog,
}: EquipmentShopProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { equipment, loading } = useEquipment();

  return (
    <motion.section
      id="equipment"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white border-b border-[#C3C6D1] py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#165DB2] uppercase">
            {lang === "EN" ? "CLINICAL CATALOG" : "كتالوج الأجهزة السريرية"}
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-[#001E40] tracking-tight">
            {lang === "EN" 
              ? "Precision Medical Equipment & Systems" 
              : "أجهزة وأنظمة طبية عالية الدقة"}
          </h2>
          <p className="max-w-2xl font-sans text-sm sm:text-base text-[#43474F] leading-relaxed">
            {lang === "EN"
              ? "Select specialized devices to add to your clinical inquiry package. Our engineers deliver custom spatial planning, calibration, and support."
              : "اختر الأجهزة المتخصصة لإضافتها إلى باقة الاستفسار الفني. يتولى مهندسونا التخطيط المكاني والمعايرة والدعم الفني الشامل."}
          </p>
        </div>

        {/* 3 Product Cards */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {loading ? (
            <div className="col-span-full py-12 text-center text-gray-500">Loading equipment...</div>
          ) : equipment.slice(0, 3).map((product) => {
            return (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                }}
                key={product.id}
                id={`product-card-${product.id}`}
                className="box-border flex flex-col justify-between bg-white border border-[#C3C6D1] rounded-sm shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                {/* Product Image with Overlay Category */}
                <div className="relative h-48 sm:h-56 bg-gray-100 overflow-hidden group flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-gray-400 font-sans text-sm font-medium">No Image</span>
                  )}
                  <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-sm border border-[#C3C6D1]/40 px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold tracking-wider text-[#165DB2]">
                    {lang === "EN" ? product.category?.name : (product.category?.nameAr || product.category?.name)}
                  </div>
                </div>

                {/* Content Padding */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3 text-start">
                    {/* Heading 3 */}
                    <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#001E40] tracking-tight">
                      {lang === "EN" ? product.name : (product.nameAr || product.name)}
                    </h3>

                    {/* Short description */}
                    <p className="font-sans text-xs sm:text-sm text-[#43474F] leading-relaxed">
                      {lang === "EN" ? product.description : (product.descriptionAr || product.description)}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-[#ECEEF0]">
                    {/* Spec features list (truncated preview) */}
                    <ul className="text-start font-sans text-[11px] text-[#43474F] space-y-1 mb-2">
                      {(lang === "EN" ? product.specifications : (product.specificationsAr || product.specifications)).slice(0, 2).map((spec, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check className="w-3 h-3 text-[#22C55E] shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onInquireProduct(product.name)}
                        id={`add-to-cart-${product.id}`}
                        className="relative overflow-hidden group flex-1 flex items-center justify-center gap-2 bg-[#001E40] text-white font-mono text-xs font-bold py-2.5 rounded cursor-pointer uppercase"
                      >
                        <span className="absolute inset-0 w-full h-full bg-[#165DB2] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                        <span className="relative z-10">
                          {lang === "EN" ? "ENQUIRE NOW" : "تقديم استفسار فني"}
                        </span>
                      </button>

                      <button
                        onClick={() => setSelectedProduct(product)}
                        id={`view-specs-${product.id}`}
                        className="p-2.5 bg-[#F2F4F6] text-[#001E40] border border-[#C3C6D1] rounded hover:bg-[#ECEEF0] transition-colors cursor-pointer"
                        title={lang === "EN" ? "Full Specifications" : "المواصفات الكاملة"}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Equipment (Trigger Assessment or catalog message) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setSelectedProduct(PRODUCTS[0])} // open spec dialog as entry
            id="view-all-equipment-btn"
            className="relative overflow-hidden group box-border inline-flex items-center justify-center bg-white border border-[#001E40] text-[#001E40] font-sans font-bold text-xs tracking-[1.6px] uppercase px-8 py-4 rounded-sm cursor-pointer shadow-sm"
          >
            <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-200">
              {lang === "EN" ? "VIEW TECHNICAL DATA SHEET" : "عرض صحيفة البيانات الفنية"}
            </span>
          </button>

          <button
            onClick={onExploreCatalog}
            id="explore-full-catalog-btn"
            className="relative overflow-hidden group box-border inline-flex items-center justify-center bg-[#165DB2] text-white font-sans font-bold text-xs tracking-[1.6px] uppercase px-8 py-4 rounded-sm cursor-pointer shadow-md"
          >
            <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
            <span className="relative z-10">
              {lang === "EN" ? "EXPLORE FULL CATALOG" : "استعراض الكتالوج الشامل"}
            </span>
          </button>
        </div>

        {/* Full Specifications Modal Dialog */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white border border-[#C3C6D1] rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col text-start">
              
              {/* Header */}
              <div className="bg-[#001E40] text-white px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#A7C8FF] tracking-wider uppercase block">
                    {lang === "EN" ? selectedProduct.category : (selectedProduct.categoryAr || selectedProduct.category)} {lang === "EN" ? "SPECIFICATION" : "مواصفات الفئة"}
                  </span>
                  <h3 className="font-sans font-bold text-lg sm:text-xl">
                    {lang === "EN" ? selectedProduct.name : (selectedProduct.nameAr || selectedProduct.name)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 hover:bg-white/10 rounded text-white transition-colors"
                  id="close-spec-modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto flex flex-col gap-6">
                <div>
                  <h4 className="font-mono text-xs font-bold text-[#165DB2] uppercase tracking-wider mb-2">
                    {lang === "EN" ? "PRODUCT DESCRIPTION" : "وصف المنتج الفني"}
                  </h4>
                  <p className="font-sans text-sm text-[#43474F] leading-relaxed">
                    {lang === "EN" ? selectedProduct.longDescription : (selectedProduct.longDescriptionAr || selectedProduct.longDescription)}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono text-xs font-bold text-[#165DB2] uppercase tracking-wider mb-2">
                    {lang === "EN" ? "CERTIFIED TECHNICAL SPECIFICATIONS" : "المواصفات الفنية المعتمدة"}
                  </h4>
                  <ul className="space-y-3">
                    {(lang === "EN" ? selectedProduct.specifications : (selectedProduct.specificationsAr || selectedProduct.specifications)).map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#F2F4F6] p-3 border-s-4 border-[#165DB2] rounded-e text-sm text-[#001E40]">
                        <Check className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#F7F9FB] border border-[#C3C6D1]/40 p-4 rounded text-xs text-[#43474F] leading-relaxed flex flex-col gap-1.5">
                  <span className="font-mono font-bold uppercase text-[#001E40]">
                    {lang === "EN" ? "LIFECYCLE INTEGRATION & COMPLIANCE" : "التوافق والتكامل مدى الحياة"}
                  </span>
                  <span>
                    {lang === "EN"
                      ? "Includes: SFDA import permits, on-site mechanical installation, precision test run validation, and continuous 24/7 technical hotline access."
                      : "يشمل: تصاريح هيئة الغذاء والدواء، التركيب الميكانيكي، التحقق من التشغيل بدقة، والوصول الفوري لخط الدعم الفني على مدار الساعة."}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-[#F2F4F6] border-t border-[#C3C6D1] px-6 py-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 text-sm font-mono text-[#43474F] hover:text-[#001E40]"
                >
                  {lang === "EN" ? "CLOSE" : "إغلاق"}
                </button>
                <button
                  onClick={() => {
                    onInquireProduct(selectedProduct.name);
                    setSelectedProduct(null);
                  }}
                  className="relative overflow-hidden group bg-[#165DB2] text-white text-xs font-mono font-bold px-4 py-2.5 rounded cursor-pointer"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#001E40] -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-out z-0" />
                  <span className="relative z-10">
                    {lang === "EN" ? "ENQUIRE NOW" : "استفسار فني مباشر"}
                  </span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </motion.section>
  );
}
