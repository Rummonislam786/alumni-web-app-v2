export interface Alumni {
  id: number;
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
}
