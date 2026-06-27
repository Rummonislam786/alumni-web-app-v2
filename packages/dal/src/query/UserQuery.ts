import { pool } from '../config/db';
import { UserDTO } from '../DTOs/user';
import { buildUpdateQuery } from '../QueryBuilder/updateQueryBuilder';

export class UserQuery {
  async createUser(user: UserDTO) {
    const result = await pool.query(
      'INSERT INTO users (Name, Email, Password, Role, photo_url) VALUES ($1, $2, $3, $4, $5)',
      [user.Name, user.Email, user.Password, user.Role, user.photo_url]
    );
    return result.rows[0];
  }

  async updateUser(Userid: number, user: Record<string, any>) {
    const { query, values } = buildUpdateQuery('users', user, {
      column: 'id',
      value: Userid,
    });
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async deleteUser(Userid: number) {
    const result = await pool.query('Delete FROM users WHERE id = $1', [
      Userid,
    ]);
    return result.rows[0];
  }

  async getUsersByName(Name: string): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM Users WHERE Name = $1', [
      Name,
    ]);
    const users: UserDTO[] = result.rows;
    return users;
  }

  async getAllUsers(): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users');
    const users: UserDTO[] = result.rows;
    return users;
  }

  async getUserByEmail(Email: string): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [
      Email,
    ]);
    const users: UserDTO = result.rows[0];
    return users;
  }

  async getUserById(Userid: number): Promise<UserDTO> {
    const result = await pool.query('SELECT * FROM users where id = $1', [
      Userid,
    ]);
    const user: UserDTO = result.rows[0];
    return user;
  }

  async getUsersByRole(Role: string): Promise<UserDTO[]> {
    const result = await pool.query('SELECT * FROM users Where Role = $1', [
      Role,
    ]);
    const users: UserDTO[] = result.rows;
    return users;
  }
}
