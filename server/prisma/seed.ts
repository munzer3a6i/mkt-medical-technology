import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Create admin user
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: { passwordHash },
    create: { username: adminUsername, passwordHash },
  });
  console.log(`✅ Admin user "${adminUsername}" created`);

  // 2. Seed Services
  const services = [
    {
      title: "CSSD",
      titleAr: "قسم التعقيم المركزي (CSSD)",
      description: "Central Sterile Supply Department infrastructure and precision instrumentation management.",
      descriptionAr: "إدارة البنية التحتية والمعدات الدقيقة لقسم التعقيم المركزي بالمستشفيات.",
      longDescription: "We engineer and maintain full-scale CSSD environments. Our turnkey solutions span from spatial design optimization to the delivery, validation, and maintenance of heavy autoclave machinery and micro-sterilization tools, ensuring zero margin for biological failure.",
      longDescriptionAr: "نصمم ونشغل بيئات التعقيم المركزي الكاملة. تشمل حلولنا هندسة وتخطيط المساحات وتوريد وتشغيل وصيانة أجهزة التعقيم بالضغط العالي (الأوتوكلاف) ومعدات التطهير الدقيق لضمان خلو تام من التلوث.",
      iconName: "Layers",
      badgeLabel: "ISO 13485 CERTIFIED SYSTEMS",
      badgeLabelAr: "أنظمة معتمدة بـ ISO 13485",
      sortOrder: 1,
      keyProjects: JSON.stringify(["Riyadh Central Surgical Hub CSSD Overhaul", "National Guard Specialist CSSD Upgrade"]),
      keyProjectsAr: JSON.stringify(["مشروع إعادة تهيئة قسم التعقيم المركزي بالمدينة الطبية بالرياض", "تطوير قسم التعقيم في مستشفى الحرس الوطني التخصصي"]),
      certifications: JSON.stringify(["ISO 13485:2016", "ISO 9001:2015", "EN 285 Compliance"]),
    },
    {
      title: "Infection Control",
      titleAr: "مكافحة العدوى والتعقيم",
      description: "Advanced sterilization and hygiene systems designed to minimize clinical risks.",
      descriptionAr: "أنظمة تعقيم ونظافة متطورة مصممة لتقليل المخاطر السريرية في الأقسام الحرجة.",
      longDescription: "Deploying institutional disinfection barriers across complex health systems. We deliver air-filtration solutions, surface decontamination loops, and digital validation platforms to uphold standard clinical hygiene protocols.",
      longDescriptionAr: "نشر حواجز تطهير مؤسسية عبر المنشآت الطبية المعقدة. نوفر حلول تنقية الهواء، وحلقات تنظيف الأسطح الرقمية، ومنصات التحقق لضمان الامتثال التام للبروتوكولات السريرية المعقمة.",
      iconName: "ShieldCheck",
      badgeLabel: "CE CLASS IIa COMPLIANT SYSTEMS",
      badgeLabelAr: "متوافق مع معايير CE CLASS IIa",
      sortOrder: 2,
      keyProjects: JSON.stringify(["MOH Regional Pandemic Preparedness Deployment", "Armed Forces Clinic Sterilization Suite"]),
      keyProjectsAr: JSON.stringify(["مبادرة وزارة الصحة للاستعداد للجوائح في كافة المناطق", "تجهيز أجنحة التعقيم ومكافحة العدوى في عيادات القوات المسلحة"]),
      certifications: JSON.stringify(["AAMI ST79", "CE Medical Device Class II", "SFDA Registered"]),
    },
    {
      title: "General Surgery",
      titleAr: "الجراحة العامة وغرف العمليات",
      description: "Specialized tools and equipment for modern surgical theaters and theater preparation.",
      descriptionAr: "أدوات ومعدات متخصصة لغرف العمليات الحديثة ومستلزمات إعداد أجنحة الجراحة.",
      longDescription: "Equipping surgical teams with premium surgical instrument bundles, laparoscopic units, and lighting towers that sustain high performance in high-stress operating environments.",
      longDescriptionAr: "تجهيز الفرق الطبية بحزم الأدوات الجراحية الممتازة، ووحدات مناظير البطن، وأبراج الإضاءة الجراحية التي تضمن الأداء الأقصى في بيئات العمليات عالية الضغط.",
      iconName: "Scissors",
      badgeLabel: "MODULAR OR TABLE SYSTEMS",
      badgeLabelAr: "طاولات عمليات معيارية",
      sortOrder: 3,
      keyProjects: JSON.stringify(["King Faisal Specialist Hospital OR Modernization", "Riyadh Care Cardiac Surgery Setup"]),
      keyProjectsAr: JSON.stringify(["تحديث غرف العمليات بمستشفى الملك فيصل التخصصي", "تجهيز غرفة جراحة القلب بمستشفى رعاية الرياض"]),
      certifications: JSON.stringify(["ISO 14971 Risk Management", "CE Marked Instruments", "FDA Registered"]),
    },
    {
      title: "Endoscope Units",
      titleAr: "وحدات المناظير الطبية",
      description: "High-definition imaging systems and specialized maintenance for endoscopy suites.",
      descriptionAr: "أنظمة تصوير عالية الدقة وصيانة متخصصة لأجنحة مناظير الجهاز الهضمي والرئة.",
      longDescription: "Endoscopy requires extreme clarity and seamless mechanical integrity. We provide high-definition colonoscopes, gastroscopes, and processing stations with integrated disinfection verification.",
      longDescriptionAr: "تتطلب المناظير وضوحاً فائقاً وموثوقية ميكانيكية كاملة. نحن نوفر مناظير القولون والمعدة عالية الدقة ومحطات التنظيف المعقمة المزودة بتقنية التحقق الفوري.",
      iconName: "Eye",
      badgeLabel: "HD RETINAL SYSTEMS",
      badgeLabelAr: "أنظمة تصوير عالية الدقة",
      sortOrder: 4,
      keyProjects: JSON.stringify(["Gastroenterology Center of Excellence Endoscopy Lab", "Riyadh North General Scope Center"]),
      keyProjectsAr: JSON.stringify(["تجهيز مختبر مناظير مركز التميز لأمراض الجهاز الهضمي", "تطوير مركز المناظير بمستشفى الرياض الشمالي العام"]),
      certifications: JSON.stringify(["ISO 13485 Quality Standard", "SGS Maintenance Approved"]),
    },
    {
      title: "Hospital Furniture",
      titleAr: "الأثاث الطبي والمستشفيات",
      description: "Ergonomic, high-durability furniture optimized for patient care and workflow efficiency.",
      descriptionAr: "أثاث مريح عالي المتانة ومقاوم للميكروبات مصمم لراحة المرضى وكفاءة التدفق العملي.",
      longDescription: "Therapeutic beds, ICU chairs, and specialized patient posture tools designed to minimize pressure sores and optimize caregiver positioning. Made of anti-microbial components.",
      longDescriptionAr: "أسرة استشفاء علاجية، مقاعد وحدات العناية المركزة، وأدوات تعديل وضعية المرضى المصممة لمنع القرح السريرية وتسهيل عمل الكوادر التمريضية. مصنوعة من مواد مضادة للميكروبات.",
      iconName: "Bed",
      badgeLabel: "ANTI-MICROBIAL ERGONOMIC BEDS",
      badgeLabelAr: "أسرة مريحة مقاومة للميكروبات",
      sortOrder: 5,
      keyProjects: JSON.stringify(["Riyadh Inpatient Ward Reconstruction (350 Beds)", "King Saud University ICU Ward Expansion"]),
      keyProjectsAr: JSON.stringify(["إعادة تجهيز غرف المرضى بالرياض (٣٥٠ سريراً)", "توسعة أجنحة العناية المركزة بمستشفى جامعة الملك سعود"]),
      certifications: JSON.stringify(["BIFMA Ergonomics", "EN 60601 Electrical Safety", "SFDA Approved"]),
    },
    {
      title: "Lab Diagnostics",
      titleAr: "المختبرات والتشخيص",
      description: "Precision analytical equipment for molecular and clinical diagnostic laboratories.",
      descriptionAr: "معدات تحليل دقيقة لمختبرات التشخيص الجزيئي والسريري.",
      longDescription: "From chemistry analyzers to molecular amplification modules, MKT provides robust laboratory hardware and software integration that speeds up accurate clinical diagnostics.",
      longDescriptionAr: "من أجهزة تحليل الكيمياء الحيوية إلى وحدات التضخيم الجزيئي، توفر MKT أجهزة وبرامج مختبرية متطورة تسهم في تسريع ورفع دقة النتائج التشخيصية.",
      iconName: "FlaskConical",
      badgeLabel: "HIGH-THROUGHPUT ANALYSIS",
      badgeLabelAr: "تحليل عالي الإنتاجية",
      sortOrder: 6,
      keyProjects: JSON.stringify(["Regional Diagnostic Sequencing Lab Setup", "Central Biobank Robotic Freezer Integration"]),
      keyProjectsAr: JSON.stringify(["تأسيس المختبر الإقليمي للتسلسل الجيني التشخيصي", "دمج نظام التجميد الروبوتي في البنك الحيوي المركزي"]),
      certifications: JSON.stringify(["CAP Laboratory Standards", "CLIA Diagnostic Standards", "ISO 15189"]),
    },
    {
      title: "Forensics",
      titleAr: "الأدلة الجنائية والطب الشرعي",
      description: "Specialized security and investigative technology for government forensic departments.",
      descriptionAr: "تكنولوجيا أمنية وتحقيقية متطورة لإدارات الطب الشرعي والأدلة الجنائية الحكومية.",
      longDescription: "Supporting Saudi security and investigative teams with advanced DNA typing equipment, spectral analysis chambers, and computerized autopsy tables engineered for national-security standards.",
      longDescriptionAr: "دعم الفرق الأمنية والتحقيقية في المملكة بأجهزة تحديد تسلسل الحمض النووي (DNA) المتقدمة، وغرف التحليل الطيفي، وطاولات التشريح المؤتمتة والمصممة وفق أرقى معايير الأمن القومي.",
      iconName: "Fingerprint",
      badgeLabel: "DNA & DIGITAL FORENSICS",
      badgeLabelAr: "الطب الشرعي والأدلة الرقمية",
      sortOrder: 7,
      keyProjects: JSON.stringify(["Riyadh Forensics Crime Lab Modernization", "Border Security Analytical Tech Hub"]),
      keyProjectsAr: JSON.stringify(["تحديث مختبرات الأدلة الجنائية بمديرية الرياض", "تأسيس مركز التحليل التقني لأمن الحدود"]),
      certifications: JSON.stringify(["ISO/IEC 17025 Calibration Standard", "ASCLD Forensic Certification"]),
    },
    {
      title: "Pain Management",
      titleAr: "علاج الألم وإعادة التأهيل",
      description: "Innovative therapeutic aids and equipment for specialized recovery and rehabilitation.",
      descriptionAr: "أجهزة ومساعدات علاجية مبتكرة للتعافي التخصصي وإعادة التأهيل العصبي والعضلي.",
      longDescription: "High-end neuromuscular therapeutic stimulators, traction modules, and localized cryo-chambers designed to aid in patient rehabilitation and chronic pain therapy.",
      longDescriptionAr: "أجهزة التحفيز العصبي العضلي عالية الأداء، ووحدات سحب الفقرات، وغرف التبريد الموضعي المصممة لمساعدة المرضى في استعادة الحركة وتخفيف الآلام المزمنة.",
      iconName: "Activity",
      badgeLabel: "REHAB & THERAPEUTICS",
      badgeLabelAr: "إعادة التأهيل والعلاج",
      sortOrder: 8,
      keyProjects: JSON.stringify(["Riyadh Sports Rehabilitation Clinic Support", "National Pain Center Neurological Suite"]),
      keyProjectsAr: JSON.stringify(["تجهيز عيادات التأهيل الرياضي بالرياض", "تجهيز الجناح العصبي في المركز الوطني لعلاج الألم"]),
      certifications: JSON.stringify(["FDA 510(k) Cleared", "CE Rehabilitation Class IIa"]),
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log(`✅ ${services.length} services seeded`);

  // 3. Seed Compliance Matrix
  const allServices = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  const cssdService = allServices.find(s => s.title === "CSSD");
  const infectionService = allServices.find(s => s.title === "Infection Control");
  const surgeryService = allServices.find(s => s.title === "General Surgery");
  const endoscopeService = allServices.find(s => s.title === "Endoscope Units");

  if (cssdService && infectionService && surgeryService && endoscopeService) {
    await prisma.complianceRow.createMany({
      data: [
        { serviceId: cssdService.id, division: "Central Sterilization (CSSD)", divisionAr: "التعقيم المركزي", standard: "ISO 13485:2016 & EN 285", recertInterval: "6 Months Interval", recertIntervalAr: "كل ٦ أشهر", sfdaStatus: "ACTIVE" },
        { serviceId: infectionService.id, division: "Infection Control Systems", divisionAr: "أنظمة مكافحة العدوى", standard: "ISO 9001:2015 & AAMI ST79", recertInterval: "12 Months Interval", recertIntervalAr: "كل ١٢ شهراً", sfdaStatus: "ACTIVE" },
        { serviceId: surgeryService.id, division: "General Surgery Suites", divisionAr: "أجنحة الجراحة العامة", standard: "EN 60601 Electrical Safety", recertInterval: "12 Months Interval", recertIntervalAr: "كل ١٢ شهراً", sfdaStatus: "ACTIVE" },
        { serviceId: endoscopeService.id, division: "Endoscope Processing", divisionAr: "معالجة المناظير الطبية", standard: "ISO 13485 & CE Mark", recertInterval: "6 Months Interval", recertIntervalAr: "كل ٦ أشهر", sfdaStatus: "ACTIVE" },
      ],
    });
    console.log("✅ 4 compliance rows seeded");
  }

  // 4. Seed Equipment Categories
  const catMonitor = await prisma.equipmentCategory.create({ data: { name: "MONITOR", nameAr: "شاشات مراقبة المرضى" } });
  const catSterilizer = await prisma.equipmentCategory.create({ data: { name: "STERILIZER", nameAr: "أجهزة التعقيم المركزي" } });
  const catSurgical = await prisma.equipmentCategory.create({ data: { name: "SURGICAL", nameAr: "طاولات العمليات والجراحة" } });
  const catEnvControl = await prisma.equipmentCategory.create({ data: { name: "ENVIRONMENT CONTROL", nameAr: "أنظمة التحكم البيئي" } });
  console.log("✅ 4 equipment categories seeded");

  // 5. Seed Equipment
  const equipmentItems = [
    {
      name: "Advanced Patient Monitor Elite",
      nameAr: "شاشة مراقبة المرضى المتقدمة (إيليت)",
      categoryId: catMonitor.id,
      sku: "MKT-MON-001",
      description: "High-fidelity monitoring systems for intensive care units and emergency departments.",
      descriptionAr: "أنظمة مراقبة عالية الدقة لوحدات العناية المركزة وأقسام الطوارئ الحساسة.",
      longDescription: "The Advanced Patient Monitor Elite represents the peak of real-time clinical tracking. It integrates high-fidelity ECG waveforms, continuous arterial blood pressure calculations, oxygen saturation parameters, and automated telemetry alerts that seamlessly synchronize with central nursing stations.",
      longDescriptionAr: "تمثل شاشة مراقبة المرضى Elite ذروة التتبع السريري في الوقت الفعلي. وهي تدمج أشكال موجات تخطيط القلب عالية الدقة، وحسابات ضغط الدم الشرياني المستمر، ومعايير تشبع الأكسجين، وتنبيهات القياس البعادي المؤتمتة التي تتزامن بسلاسة مع محطات التمريض المركزية.",
      image: "/assets/advanced patient monitor elite.jpg",
      specifications: JSON.stringify(["15.6-inch multi-touch anti-glare screen", "Dynamic ST-segment and arrhythmia detection algorithm", "Full integration with HL7 & hospital central networks", "8-hour hot-swappable battery backups for inter-ward transit"]),
      specificationsAr: JSON.stringify(["شاشة مضادة للانعكاس مقاس ١٥.٦ بوصة تعمل باللمس المتعدد", "خوارزمية ديناميكية للكشف عن ضربات القلب غير المنتظمة ومقطع ST", "تكامل كامل مع بروتوكولات HL7 والشبكات المركزية للمستشفيات", "بطاريات احتياطية قابلة للتبديل السريع تدوم ٨ ساعات للنقل بين الأجنحة"]),
    },
    {
      name: "Sentinel Sterilization Unit",
      nameAr: "وحدة تعقيم الحارس (سنتينل)",
      categoryId: catSterilizer.id,
      sku: "MKT-STR-001",
      description: "Automated CSSD solutions ensuring the highest standards of clinical hygiene and safety.",
      descriptionAr: "حلول مؤتمتة لقسم التعقيم المركزي تضمن أعلى معايير النظافة والسلامة السريرية.",
      longDescription: "Upholding CSSD precision, the Sentinel Sterilization Unit utilizes high-temperature pressurization loops with computerized validation sensors. Designed to process surgery packs and precision surgical instruments rapidly while minimizing utility consumption.",
      longDescriptionAr: "مع الحفاظ على دقة التعقيم المركزي، تستخدم وحدة تعقيم Sentinel حلقات ضغط وحرارة عالية مع مستشعرات تحقق مؤتمتة. تم تصميمها لمعالجة حزم العمليات والأدوات الجراحية الدقيقة بسرعة مع تقليل استهلاك الطاقة والمياه.",
      image: "/assets/sentinel sterilization unit.jpg",
      specifications: JSON.stringify(["Dual-chamber pass-through system for sterile/unsterile zones", "Fully digital control interface with cycle-logging receipt printer", "Reduces water consumption by up to 35% compared to legacy units", "Approved under EN 285 and CE standards for medical autoclaves"]),
      specificationsAr: JSON.stringify(["نظام تمرير مزدوج الغرفة لعزل المناطق المعقمة وغير المعقمة", "واجهة تحكم رقمية بالكامل مع طابعة إيصالات تسجيل دورات التعقيم", "تقليل استهلاك المياه بنسبة تصل إلى ٣٥٪ مقارنة بالأنظمة التقليدية", "معتمد بموجب معايير EN 285 والآيزو لأجهزة الأوتوكلاف الطبية"]),
    },
    {
      name: "Ortho-Flex Surgical Table",
      nameAr: "طاولة الجراحة المرنة للعظام (أورثو-فليكس)",
      categoryId: catSurgical.id,
      sku: "MKT-SUR-001",
      description: "Versatile orthopedic positioning systems designed for precision surgical workflows.",
      descriptionAr: "أنظمة مرنة لتحديد وضعية المرضى في جراحة العظام مصممة لتدفق جراحي دقيق.",
      longDescription: "The Ortho-Flex Surgical Table is a masterpiece of orthopedic biomechanics. Constructed with high-tensile carbon fiber materials to ensure complete radiological translucency. Allows surgeons to achieve precise patient tilting with quiet, electro-hydraulic controls.",
      longDescriptionAr: "تعد طاولة الجراحة Ortho-Flex تحفة فنية في مجال الميكانيكا الحيوية لجراحة العظام. تم تصنيعها من مواد ألياف الكربون عالية الشد لضمان نفاذية إشعاعية كاملة لتصوير الأشعة. تتيح للجراحين تحقيق إمالة دقيقة للمريض بفضل عناصر التحكم الهيدروليكية الكهربائية الهادئة.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
      specifications: JSON.stringify(["Carbon-fiber modular panels for artifact-free imaging scans", "Continuous electro-hydraulic height, tilt, and slide adjustment", "Universal accessory side-rails for robust traction attachment", "High capacity support structure (supports loads up to 450 kg)"]),
      specificationsAr: JSON.stringify(["ألواح كربونية معيارية لتصوير إشعاعي خالٍ من التشويش أو العيوب", "تعديل مستمر هيدروليكي-كهربائي للارتفاع، الإمالة، والانزلاق للوضعية", "قضبان جانبية عالمية للملحقات لتركيب أدوات الشد والقوة بمتانة", "هيكل دعم عالي الكفاءة يدعم أحمالاً تصل إلى ٤٥٠ كجم بسلامة"]),
    },
    {
      name: "NICU Precision Incubator",
      nameAr: "حاضنة الأطفال حديثي الولادة فائقة الدقة",
      categoryId: catEnvControl.id,
      sku: "MKT-ENV-001",
      description: "High-precision micro-environment control for neonatal intensive care units.",
      descriptionAr: "تحكم فائق الدقة في البيئة المحيطة بوحدات العناية المركزة لحديثي الولادة.",
      longDescription: "The NICU Precision Incubator delivers micro-environment control designed for neonates. Combining precise thermo-regulation, active humidity balancing, and a serene acoustic profile, it shields developing infants from hazardous sensory stresses.",
      longDescriptionAr: "توفر حاضنة NICU Precision تحكماً مثالياً في البيئة المحيطة بالرضع حديثي الولادة. ومن خلال الجمع بين التنظيم الحراري الدقيق، وموازنة الرطوبة النشطة، ومستوى صوتي هادئ للغاية، فإنها تحمي الأطفال الناميين من الضغوط الحسية الخطيرة بالمستشفيات.",
      image: "/assets/NICU precision incubators.jpg",
      specifications: JSON.stringify(["Active micro-climate closed-loop thermal stability", "Double-walled acoustic barrier isolating external hospital noise", "Integrated electronic weighing scale with dynamic drift correction", "Continuous LED phototherapy module compatibility"]),
      specificationsAr: JSON.stringify(["استقرار حراري نشط مغلق الحلقة للمناخ الدقيق الداخلي للحاضنة", "حاجز صوتي مزدوج الجدار لعزل الضوضاء الخارجية للمستشفى", "ميزان إلكتروني متكامل للوزن مع ميزة التصحيح الديناميكي للوزن", "توافق كامل مع وحدة العلاج الضوئي LED المستمر"]),
    },
  ];

  for (const e of equipmentItems) {
    await prisma.equipment.create({ data: e });
  }
  console.log(`✅ ${equipmentItems.length} equipment items seeded`);

  // 6. Seed Partner Categories
  const catGov = await prisma.partnerCategory.create({ data: { name: "Government", nameAr: "القطاع الحكومي" } });
  const catHealth = await prisma.partnerCategory.create({ data: { name: "Healthcare", nameAr: "الرعاية الصحية" } });
  console.log("✅ 2 partner categories seeded");

  // 7. Seed Partners
  const partners = [
    { name: "Ministry of Interior", nameAr: "وزارة الداخلية", categoryId: catGov.id, iconName: "Shield" },
    { name: "Forensic Department", nameAr: "الأدلة الجنائية والطب الشرعي", categoryId: catGov.id, iconName: "Microscope" },
    { name: "Intelligence Services", nameAr: "أجهزة الاستخبارات", categoryId: catGov.id, iconName: "Eye" },
    { name: "National General Hospital", nameAr: "المستشفى الوطني العام", categoryId: catHealth.id, iconName: "Hospital" },
    { name: "Biomedical Research Center", nameAr: "مركز أبحاث الطب الحيوي", categoryId: catHealth.id, iconName: "TestTube" },
    { name: "Specialist Medical Institute", nameAr: "المعهد الطبي المتخصص", categoryId: catHealth.id, iconName: "Stethoscope" },
  ];

  for (const p of partners) {
    await prisma.partner.create({ data: p });
  }
  console.log(`✅ ${partners.length} partners seeded`);

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
