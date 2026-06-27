import { AlumniDTO } from '@alumni-web-app-v2/dal/src/DTOs/alumni';
import { AlumniQuery } from '@alumni-web-app-v2/dal/src/query/AlumniQuery';
export class AlumniManager {
  public async createAlumni(
    user_id: number,
    bio: string,
    company: string,
    experience_years: number,
    graduation_year: number,
    department: string,
    job_title: string,
    linkedin_url: string
  ) {
    const alumniDTO = new AlumniDTO(
      user_id,
      graduation_year,
      department,
      company,
      job_title,
      experience_years,
      bio,
      linkedin_url
    );
    const alumniQuery = new AlumniQuery();
    const newAlumni = await alumniQuery.createAlumni(alumniDTO);
    console.log(newAlumni);
    return newAlumni;
  }
  public async updateAlumni(Userid: number, user: AlumniDTO) {
    const allowedFields = [
      'bio',
      'company',
      'experience_years',
      'graduation_year',
      'job_title',
      'linkedin_url',
      'department',
    ];
    const alumni: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in user) {
        alumni[key] = (user as any)[key];
      }
    }
    if (Object.keys(alumni).length === 0) {
      throw new Error('No valid fields to update');
    }
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.updateAlumni(Userid, alumni);
  }
  public async deleteAlumni(Userid: number) {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.deleteAlumni(Userid);
  }

  public async getAllAlumni() {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.getAllAlumni();
  }
  public async getAllAlumnibyCompany(company: string) {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.getAllAlumnibyCompany(company);
  }
  public async getAllAlumnibyJobTitle(job_title: string) {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.getAllAlumnibyJobTitle(job_title);
  }
  public async getAllAlumniByUser(id: number) {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.getAllAlumniByUser(id);
  }
  public async getAlumniById(id: number) {
    const alumniQuery = new AlumniQuery();
    return await alumniQuery.getAlumniById(id);
  }
}
