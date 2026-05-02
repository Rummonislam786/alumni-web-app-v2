export type Role = 'admin' | 'user' | 'alumni';

// Database truth
export interface User {
  ID: number;
  Name: string;
  Email: string;
  Password: string;
  Role: Role;
  photo_url?: string | null;
  login_at: Date | null;
  logout_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
//API input
