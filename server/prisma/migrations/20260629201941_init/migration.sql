-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "titleAr" TEXT,
    "description" TEXT NOT NULL,
    "descriptionAr" TEXT,
    "longDescription" TEXT,
    "longDescriptionAr" TEXT,
    "iconName" TEXT NOT NULL DEFAULT 'Activity',
    "badgeLabel" TEXT,
    "badgeLabelAr" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "keyProjects" TEXT NOT NULL DEFAULT '[]',
    "keyProjectsAr" TEXT NOT NULL DEFAULT '[]',
    "certifications" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ComplianceRow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "divisionAr" TEXT,
    "standard" TEXT NOT NULL,
    "recertInterval" TEXT,
    "recertIntervalAr" TEXT,
    "sfdaStatus" TEXT NOT NULL DEFAULT 'ACTIVE',
    CONSTRAINT "ComplianceRow_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EquipmentCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "categoryId" TEXT,
    "sku" TEXT,
    "description" TEXT,
    "descriptionAr" TEXT,
    "longDescription" TEXT,
    "longDescriptionAr" TEXT,
    "image" TEXT,
    "specifications" TEXT NOT NULL DEFAULT '[]',
    "specificationsAr" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EquipmentCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PartnerCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nameAr" TEXT,
    "categoryId" TEXT,
    "iconName" TEXT,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Partner_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PartnerCategory" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");
