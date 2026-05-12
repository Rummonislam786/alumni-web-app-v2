import { BaseDTO } from './base';

export class AlumniDTO implements BaseDTO {
  user_id: number;
  graduation_year: number;
  department: string;
  company?: string | null;
  job_title?: string | null;
  experience_years: number;
  bio?: string | null;
  linkedin_url?: string | null;
  createdAt: Date;
  updatedAt: Date;
  constructor(
    user_id: number,
    graduation_year: number,
    department: string,
    company?: string | null,
    job_title?: string | null,
    experience_years?: number,
    bio?: string | null,
    linkedin_url?: string | null
  ) {
    this.user_id = user_id;
    this.graduation_year = graduation_year;
    this.department = department;
    this.company = company;
    this.job_title = job_title;
    this.experience_years = experience_years || 0;
    this.bio = bio;
    this.linkedin_url = linkedin_url;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
