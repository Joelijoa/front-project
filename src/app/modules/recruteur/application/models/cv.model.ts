export interface CV {
  id: string;
  candidateName: string;
  candidateEmail: string;
  fileName: string;
  uploadDate: Date;
  content: string;
  summary?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
} 