import { pool } from '../../config/db';
import { AlumniResponseDTO } from '../DTOs/alumni';

export class AlumniQuery {
  async createAlumni(data: AlumniResponseDTO) {
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

  async updateAlumni(id: number, data: AlumniResponseDTO) {
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

  async deleteAlumni(id: number) {
    const result = await pool.query('Delete FROM alumni WHERE id = ?', [id]);
    return result.rows[0];
  }

  async getAllAlumnibyCompany(company: string): Promise<AlumniResponseDTO[]> {
    const result = await pool.query('SELECT * FROM alumni WHERE company = ?', [
      company,
    ]);
    return result.rows;
  }

  async getAllAlumnibyJobTitle(
    job_title: string
  ): Promise<AlumniResponseDTO[]> {
    const result = await pool.query(
      'SELECT * FROM alumni WHERE job_title = ?',
      [job_title]
    );
    return result.rows;
  }

  async getAllAlumni(): Promise<AlumniResponseDTO[]> {
    const result = await pool.query('SELECT * FROM alumni');
    return result.rows;
  }

  async getAllAlumniByUser(id: number): Promise<AlumniResponseDTO> {
    const result = await pool.query('SELECT * FROM alumni WHERE user_id = ?', [
      id,
    ]);
    return result.rows[0];
  }
  async getAlumniById(id: number): Promise<AlumniResponseDTO> {
    const result = await pool.query('SELECT * FROM alumni where id = ?', [id]);
    return result.rows[0];
  }
}
