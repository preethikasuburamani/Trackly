export type ApplicationStatus =
  | "Wishlist"
  | "Applied"
  | "Interview"
  | "Assessment"
  | "Offer"
  | "Rejected";

export interface Application {
  id?: string;
  userId: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  status: ApplicationStatus;
  appliedDate: string;
  interviewDate?: string;
  notes?: string;
  jobUrl?: string;
  createdAt: string;
}