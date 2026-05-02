import { BaseResponseDTO } from './base';

export type Role = 'admin' | 'user' | 'alumni';

export class CreateUserDTO {
  Name: string;
  Email: string;
  Password: string;
  Role: Role;
  photo_url?: string | null;
  constructor(
    Name: string,
    Email: string,
    Password: string,
    Role: Role,
    photo_url?: string | null
  ) {
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Role = Role;
    this.photo_url = photo_url;
  }
}
//API output
export class UserResponseDTO implements BaseResponseDTO {
  id: number;
  Name: string;
  Email: string;
  Role: Role;
  photo_url?: string | null;
  login_at: Date | null;
  logout_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    Name: string,
    Email: string,
    Role: Role,
    photo_url?: string | null,
    login_at?: Date | null,
    logout_at?: Date | null
  ) {
    this.id = id;
    this.Name = Name;
    this.Email = Email;
    this.Role = Role;
    this.photo_url = photo_url;
    this.login_at = login_at ?? null;
    this.logout_at = logout_at ?? null;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
// API input for login
export class LoginDTO {
  Email: string;
  Password: string;
  constructor(Email: string, Password: string) {
    this.Email = Email;
    this.Password = Password;
  }
}
//API input for updating user details
export class UpdateUserDTO {
  Name?: string;
  Email?: string;
  Password?: string;
  Role?: Role;
  photo_url?: string | null;
  constructor(
    Name?: string,
    Email?: string,
    Password?: string,
    Role?: Role,
    photo_url?: string | null
  ) {
    this.Name = Name;
    this.Email = Email;
    this.Password = Password;
    this.Role = Role;
    this.photo_url = photo_url;
  }
}
