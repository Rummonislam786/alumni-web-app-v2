import { Role } from '@alumni-web-app-v2/shared';
import { pool } from '../../config/db';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../DTOs/user';

export class UsersQuery {
  static async createUser(data: CreateUserDTO) {
    const result = await pool.query(
      'INSERT INTO users (Name, Email, Password, Role, photo_url) VALUES (?, ?, ?, ?, ?)',
      [data.Name, data.Email, data.Password, data.Role, data.photo_url]
    );
    return result.rows[0];
  }

  static async updateUser(id: number, data: UpdateUserDTO) {
    const result = await pool.query(
      'UPDATE users SET Name = ?, Email = ?, Password = ?, Role = ?, photo_url = ? WHERE id = ?',
      [data.Name, data.Email, data.Password, data.Role, data.photo_url]
    );
    return result.rows[0];
  }

  static async deleteUser(id: number) {
    const result = await pool.query('Delete FROM users WHERE id = ?', [id]);
    return result.rows[0];
  }

  static async getUsersbyName(Name: string): Promise<UserResponseDTO[]> {
    const result = await pool.query('SELECT * FROM Users WHERE Name = ?', [
      Name,
    ]);
    return result.rows;
  }

  static async getAllUsers(): Promise<UserResponseDTO[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  static async getAllUsersByEmail(Email: string): Promise<UserResponseDTO> {
    const result = await pool.query('SELECT * FROM users WHERE email = ?', [
      Email,
    ]);
    return result.rows[0];
  }

  static async getUsersById(id: number): Promise<UserResponseDTO> {
    const result = await pool.query('SELECT * FROM users where id = ?', [id]);
    return result.rows[0];
  }

  static async getUsersByRole(Role: Role): Promise<UserResponseDTO[]> {
    const result = await pool.query('SELECT * FROM users Where Role = ?', [
      Role,
    ]);
    return result.rows;
  }
}
