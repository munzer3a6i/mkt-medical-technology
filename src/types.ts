export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: string;
  categoryAr?: string;
  description: string;
  descriptionAr?: string;
  longDescription: string;
  longDescriptionAr?: string;
  image: string;
  specifications: string[];
  specificationsAr?: string[];
}

export interface ServiceDivision {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  longDescription: string;
  longDescriptionAr?: string;
  iconName: string;
  keyProjects: string[];
  keyProjectsAr?: string[];
  certifications: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
