import { BaseDTO } from './base';

export type Role = 'admin' | 'user' | 'alumni';

//API output
export class UserDTO implements BaseDTO {
  Name: string;
  password: string;
  Email: string;
  Role: string;
  photo_url?: string | null;
  login_at: Date | null;
  logout_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    Name: string,
    Email: string,
    Password: string,
    Role: string,
    photo_url?: string | null,
    login_at?: Date | null,
    logout_at?: Date | null
  ) {
    this.Name = Name;
    this.Email = Email;
    this.Role = Role;
    this.password = Password;
    this.photo_url = photo_url;
    this.login_at = login_at ?? null;
    this.logout_at = logout_at ?? null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
