export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  salary?: string;
  description: string;
  requirements: string;
  process?: string;
  companyDescription?: string;
  benefits?: string;
  expiryDate?: Date;
  publishedDate: Date;
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'ARCHIVED';
  views: number;
  applications: number;
  remote?: boolean;
} 