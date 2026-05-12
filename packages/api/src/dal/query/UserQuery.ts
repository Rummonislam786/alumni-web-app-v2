import { Role } from '@alumni-web-app-v2/shared';
import { pool } from '../../config/db';
import { UserDTO } from '../DTOs/user';

export class UsersQuery {
  async createUser(user: UserDTO) {
    const result = await pool.query(
      'INSERT INTO users (Name, Email, Password, Role, photo_url) VALUES (?, ?, ?, ?, ?)',
      [user.Name, user.Email, user.Password, user.Role, user.photo_url]
    );
    return result.rows[0];
  }

  async updateUser(id: number, user: UserDTO) {
    const result = await pool.query(
      'UPDATE users SET Name = ?, Email = ?, Password = ?, Role = ?, photo_url = ? WHERE id = ?',
      [user.Name, user.Email, user.Password, user.Role, user.photo_url]
    );
    return result.rows[0];
  }

  async deleteUser(id: number) {
    const result = await pool.query('Delete FROM users WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getUsersbyName(Name: string): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM Users WHERE Name = ?', [
      Name,
    ]);
    return result.rows;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async getAllUsersByEmail(Email: string): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users WHERE email = ?', [
      Email,
    ]);
    return result.rows[0];
  }

  async getUsersById(id: number): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users where id = ?', [id]);
    return result.rows[0];
  }

  async getUsersByRole(Role: Role): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users Where Role = ?', [
      Role,
    ]);
    return result.rows;
  }
}
