
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  detailedDescription?: string;
  benefits?: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  text: string;
  role: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgrounds: string[];
  aboutTitle: string;
  services: Service[];
}