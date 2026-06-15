export interface UserSettings {
  uid: string;

  fullName: string;
  email: string;

  targetRole: string;
  preferredLocation: string;
  expectedSalary: string;

  emailNotifications: boolean;
  interviewReminders: boolean;
  weeklyReports: boolean;
}