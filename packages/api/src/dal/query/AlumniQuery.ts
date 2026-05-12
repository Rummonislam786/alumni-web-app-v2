import { pool } from '../../config/db';
import { AlumniDTO } from '../DTOs/alumni';

export class AlumniQuery {
  async createAlumni(alumni: AlumniDTO) {
    const result = await pool.query(
      'INSERT INTO alumni (user_id, bio, company, experience_years, graduation_year, job_title, linkedin_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        alumni.user_id,
        alumni.bio,
        alumni.company,
        alumni.experience_years,
        alumni.graduation_year,
        alumni.job_title,
        alumni.linkedin_url,
      ]
    );
    return result.rows[0];
  }

  async updateAlumni(id: number, alumni: AlumniDTO) {
    const result = await pool.query(
      'UPDATE alumni SET bio = ?, company = ?, experience_years = ?, graduation_year = ?, job_title = ?, linkedin_url = ? WHERE id = ?',
      [
        alumni.bio,
        alumni.company,
        alumni.experience_years,
        alumni.graduation_year,
        alumni.job_title,
        alumni.linkedin_url,
        id,
      ]
    );
    return result.rows[0];
  }

  async deleteAlumni(id: number) {
    const result = await pool.query('Delete FROM alumni WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllAlumnibyCompany(company: string): Promise<AlumniDTO[]> {
    const result = await pool.query('SELECT * FROM alumni WHERE company = ?', [
      company,
    ]);
    return result.rows;
  }

  async getAllAlumnibyJobTitle(job_title: string): Promise<AlumniDTO[]> {
    const result = await pool.query(
      'SELECT * FROM alumni WHERE job_title = ?',
      [job_title]
    );
    return result.rows;
  }

  async getAllAlumni(): Promise<AlumniDTO[]> {
    const result = await pool.query('SELECT * FROM alumni');
    return result.rows;
  }

  async getAllAlumniByUser(id: number): Promise<AlumniDTO> {
    const result = await pool.query('SELECT * FROM alumni WHERE user_id = ?', [
      id,
    ]);
    return result.rows[0];
  }
  async getAlumniById(id: number): Promise<AlumniDTO> {
    const result = await pool.query('SELECT * FROM alumni where id = ?', [id]);
    return result.rows[0];
  }
}
