import { pool } from '../../config/db';
import {
  CreateAlumniDTO,
  UpdateAlumniDTO,
  AlumniResponseDTO,
} from '../DTOs/alumni';

export class AlumniQuery {
  static async createAlumni(data: CreateAlumniDTO) {
    const result = await pool.query(
      'INSERT INTO alumni (user_id, bio, company, experience_years, graduation_year, job_title, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.user_id,
        data.bio,
        data.company,
        data.experience_years,
        data.graduation_year,
        data.job_title,
        data.linkedin_url,
      ]
    );
    return result.rows[0];
  }

  static async updateAlumni(id: number, data: UpdateAlumniDTO) {
    const result = await pool.query(
      'UPDATE alumni SET bio = ?, company = ?, experience_years = ?, graduation_year = ?, job_title = ?, linkedin_url = ? WHERE id = ?',
      [
        data.bio,
        data.company,
        data.experience_years,
        data.graduation_year,
        data.job_title,
        data.linkedin_url,
        id,
      ]
    );
    return result.rows[0];
  }

  static async deleteAlumni(id: number) {
    const result = await pool.query('Delete FROM alumni WHERE id = ?', [id]);
    return result.rows[0];
  }

  static async getAllAlumnibyCompany(
    company: string
  ): Promise<AlumniResponseDTO[]> {
    const result = await pool.query('SELECT * FROM alumni WHERE company = ?', [
      company,
    ]);
    return result.rows;
  }

  static async getAllAlumnibyJobTitle(
    job_title: string
  ): Promise<AlumniResponseDTO[]> {
    const result = await pool.query(
      'SELECT * FROM alumni WHERE job_title = ?',
      [job_title]
    );
    return result.rows;
  }

  static async getAllAlumni(): Promise<AlumniResponseDTO[]> {
    const result = await pool.query('SELECT * FROM alumni');
    return result.rows;
  }

  static async getAllAlumniByUser(id: number): Promise<AlumniResponseDTO> {
    const result = await pool.query('SELECT * FROM alumni WHERE user_id = ?', [
      id,
    ]);
    return result.rows[0];
  }
  static async getAlumniById(id: number): Promise<AlumniResponseDTO> {
    const result = await pool.query('SELECT * FROM alumni where id = ?', [id]);
    return result.rows[0];
  }
}
