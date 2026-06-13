import { Role } from '@alumni-web-app-v2/shared';
import { pool } from '../../config/db';
import { UserDTO } from '../DTOs/user';

export class UsersQuery {
  async createUser(user: UserDTO) {
    const result = await pool.query(
      'INSERT INTO users (Name, Email, Password, Role, photo_url) VALUES ($1, $2, $3, $4, $5)',
      [user.Name, user.Email, user.Password, user.Role, user.photo_url]
    );
    return result.rows[0];
  }

  async updateUser(id: number, user: UserDTO) {
    const result = await pool.query(
      'UPDATE users SET Name = $1, Email = $2, Password = $3, Role = $4, photo_url = $5 WHERE id = $6',
      [user.Name, user.Email, user.Password, user.Role, user.photo_url, id]
    );
    return result.rows[0];
  }

  async deleteUser(id: number) {
    const result = await pool.query('Delete FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  async getUsersbyName(Name: string): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM Users WHERE Name = $1', [
      Name,
    ]);
    return result.rows;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async getAllUsersByEmail(Email: string): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      Email,
    ]);
    return result.rows[0];
  }

  async getUsersById(id: number): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users where id = $1', [id]);
    return result.rows[0];
  }

  async getUsersByRole(Role: Role): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users Where Role = $1', [
      Role,
    ]);
    return result.rows;
  }
}
