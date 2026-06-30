// Shared types between client (admin + public) and server

export interface Service {
  id: string;
  title: string;
  titleAr: string | null;
  description: string;
  descriptionAr: string | null;
  longDescription: string | null;
  longDescriptionAr: string | null;
  iconName: string;
  badgeLabel: string | null;
  badgeLabelAr: string | null;
  sortOrder: number;
  keyProjects: string[];
  keyProjectsAr: string[];
  certifications: string[];
  createdAt?: string;
}

export interface ComplianceRow {
  id: string;
  serviceId: string;
  division: string;
  divisionAr: string | null;
  standard: string;
  recertInterval: string | null;
  recertIntervalAr: string | null;
  sfdaStatus: string;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  nameAr: string | null;
}

export interface Equipment {
  id: string;
  name: string;
  nameAr: string | null;
  categoryId: string | null;
  category?: EquipmentCategory | null;
  sku: string | null;
  description: string | null;
  descriptionAr: string | null;
  longDescription: string | null;
  longDescriptionAr: string | null;
  image: string | null;
  specifications: string[];
  specificationsAr: string[];
  createdAt?: string;
}

export interface PartnerCategory {
  id: string;
  name: string;
  nameAr: string | null;
}

export interface Partner {
  id: string;
  name: string;
  nameAr: string | null;
  categoryId: string | null;
  category?: PartnerCategory | null;
  iconName: string | null;
  logo: string | null;
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}

export interface ApiError {
  error: string;
}
