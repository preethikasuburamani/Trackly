export interface Profile {
  id?: string;
  uid: string;

  fullName: string;
  email: string;

  targetRole: string;
  location: string;

  github: string;
  linkedin: string;
  portfolio: string;

  about: string;

  createdAt: string;
}