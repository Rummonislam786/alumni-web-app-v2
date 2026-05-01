import {
  CreateAlumniDTO,
  UpdateAlumniDTO,
  AlumniResponseDTO,
  //   NotFoundError,
} from '@alumni-web-app-v2/shared';

import { AlumniRepository } from '@alumni-web-app-v2/dal';

export class AlumniService {
  private alumniRepository: AlumniRepository;

  constructor(alumniRepository: AlumniRepository) {
    this.alumniRepository = alumniRepository;
  }

  async createAlumni(data: CreateAlumniDTO): Promise<AlumniResponseDTO> {
    const alumni = await this.alumniRepository.create(data);
    return alumni;
  }

  async updateAlumni(
    id: number,
    data: UpdateAlumniDTO
  ): Promise<AlumniResponseDTO> {
    const alumni = await this.alumniRepository.update(id, data);
    return alumni;
  }

  async deleteAlumni(id: number): Promise<void> {
    await this.alumniRepository.delete(id);
  }

  async getAlumniById(id: number): Promise<AlumniResponseDTO | null> {
    const alumni = await this.alumniRepository.findById(id);
    return alumni;
  }

  async getAllAlumni(): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList;
  }

  async getAlumniByGraduationYear(
    graduation_year: number
  ): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter(
      (alumni) => alumni.graduation_year === graduation_year
    );
  }
  async getAlumniByDepartment(
    department: string
  ): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter((alumni) => alumni.department === department);
  }
  async getAlumniByCompany(company: string): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter((alumni) => alumni.company === company);
  }

  async getAlumniByJobTitle(job_title: string): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter((alumni) => alumni.job_title === job_title);
  }

  async getAlumniByCompaniesAndJobTitle(
    company: string,
    job_title: string
  ): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter(
      (alumni) => alumni.company === company && alumni.job_title === job_title
    );
  }
  async getAlumniByGraduationYearAndDepartment(
    graduation_year: number,
    department: string
  ): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter(
      (alumni) =>
        alumni.graduation_year === graduation_year &&
        alumni.department === department
    );
  }

  async getAlumniByUserId(user_id: number): Promise<AlumniResponseDTO[]> {
    const alumniList = await this.alumniRepository.findAll();
    return alumniList.filter((alumni) => alumni.user_id === user_id);
  }
}
