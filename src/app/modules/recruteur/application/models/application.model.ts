export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  resume: string;
  coverLetter: string;
}

export interface Offer {
  id: string;
  title: string;
  company: string;
}

export interface Application {
  id: string;
  candidate: Candidate;
  offer: Offer;
  status: 'PENDING' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
  applicationDate: Date;
  lastUpdate: Date;
  recruiterResponse?: string;
  responseDate?: Date;
} 