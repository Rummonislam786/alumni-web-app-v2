import { Pool } from 'pg';
import { IReadRepository } from '../interfaces/IReadRepository';
import { IWriteRepository } from '../interfaces/IWriteRepository';
import { CreateUserDTO, UpdateUserDTO, User } from '@alumni-web-app-v2/shared';

export abstract class UserRepository
  implements IWriteRepository<User>, IReadRepository<User>
{
  constructor(private pool: Pool) {}
  // export interface CreateUserDTO {
  //   Name: string;
  //   Email: string;
  //   Password: string;
  //   Role: Role;
  //   photo_url?: string | null;
  // }

  async create(item: CreateUserDTO): Promise<User> {
    const { rows } = await this.pool.query(
      `INSERT INTO users (name, email, password, role, photo_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [item.Name, item.Email, item.Password, item.Role, item.photo_url]
    );
    return rows[0];
  }

  //   export interface UpdateUserDTO {
  //   Name?: string;
  //   Email?: string;
  //   Password?: string;
  //   Role?: Role;
  //   photo_url?: string | null;
  // }

  async update(id: string, item: UpdateUserDTO): Promise<User> {
    const allowedFields = ['name', 'email', 'password', 'role', 'photo_url']; // extend as needed

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key of Object.keys(item) as (keyof UpdateUserDTO)[]) {
      const value = item[key];
      if (value !== undefined && allowedFields.includes(key)) {
        fields.push(`${key} = $${index++}`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push(`updatedAt = NOW()`); // adjust to your schema

    values.push(id);

    const { rows } = await this.pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    if (!rows[0]) throw new Error('User not found');

    return rows[0];
  }
  async delete(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  }

  async findById(id: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM users WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }
  async findAll(): Promise<User[]> {
    const { rows } = await this.pool.query(`SELECT * FROM users`);
    return rows;
  }
}
