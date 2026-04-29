import { Pool } from 'pg';
import { IReadRepository } from '../interfaces/IReadRepository';
import { IWriteRepository } from '../interfaces/IWriteRepository';
import {
  Alumni,
  CreateAlumniDTO,
  UpdateAlumniDTO,
} from '@alumni-web-app-v2/shared';

export abstract class AlumniRepository
  implements IWriteRepository<Alumni>, IReadRepository<Alumni>
{
  constructor(private pool: Pool) {}
  // export interface CreateAlumniDTO {
  //   user_id: number;
  //   graduation_year: number;
  //   department: string;
  //   company?: string | null;
  //   job_title?: string | null;
  //   experience_years: number;
  //   bio?: string | null;
  //   linkedin_url?: string | null;
  // }
  async create(item: CreateAlumniDTO): Promise<Alumni> {
    const { rows } = await this.pool.query(
      `INSERT INTO alumni (user_id, graduation_year, department, company, job_title, experience_years, bio, linkedin_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        item.user_id,
        item.graduation_year,
        item.department,
        item.company,
        item.job_title,
        item.experience_years,
        item.bio,
        item.linkedin_url,
      ]
    );
    return rows[0];
  }

  // export interface UpdateAlumniDTO {
  //   graduation_year?: number;
  //   department?: string;
  //   company?: string | null;
  //   job_title?: string | null;
  //   experience_years?: number;
  //   bio?: string | null;
  //   linkedin_url?: string | null;
  // }

  async update(id: string, item: UpdateAlumniDTO): Promise<Alumni> {
    const allowedFields = [
      'graduation_year',
      'department',
      'company',
      'job_title',
      'experience_years',
      'bio',
      'linkedin_url',
    ];

    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    for (const key of Object.keys(item) as (keyof UpdateAlumniDTO)[]) {
      const value = item[key];
      if (value !== undefined && allowedFields.includes(key)) {
        fields.push(`${key} = $${index++}`);
        values.push(value);
      }
    }

    if (fields.length === 0) {
      throw new Error('No valid fields to update');
    }

    fields.push(`updatedAt = NOW()`);
    values.push(id);

    const { rows } = await this.pool.query(
      `UPDATE alumni SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );

    if (!rows[0]) throw new Error('Alumni not found');

    return rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.pool.query(`DELETE FROM alumni WHERE id = $1`, [id]);
  }

  async findById(id: string): Promise<Alumni | null> {
    const { rows } = await this.pool.query(
      `SELECT * FROM alumni WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }
  async findAll(): Promise<Alumni[]> {
    const { rows } = await this.pool.query(`SELECT * FROM alumni`);
    return rows;
  }
}
