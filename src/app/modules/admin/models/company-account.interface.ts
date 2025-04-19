export interface CompanyAccount {
  id: number;
  companyName: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  taxId: string;
  legalRepresentative: string;
  status: 'pending' | 'approved' | 'rejected' | 'processing';
  rejectionReason?: string;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: number;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
} 