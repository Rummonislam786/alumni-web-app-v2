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
export interface CreateUserDTO {
  Name: string;
  Email: string;
  Password: string;
  Role: Role;
  photo_url?: string | null;
}
//API output
export interface UserResponseDTO {
  ID: number;
  Name: string;
  Email: string;
  Role: Role;
  photo_url?: string | null;
  login_at: Date | null;
  logout_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
// API input for login
export interface LoginDTO {
  Email: string;
  Password: string;
}
//API input for updating user details
export interface UpdateUserDTO {
  Name?: string;
  Email?: string;
  Password?: string;
  Role?: Role;
  photo_url?: string | null;
}
