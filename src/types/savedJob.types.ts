export interface SavedJob {
  id?: string;
  userId: string;

  company: string;
  role: string;
  location: string;

  jobUrl: string;

  notes?: string;

  createdAt: string;
}