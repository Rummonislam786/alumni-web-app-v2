import { Request, Response } from 'express';
import { AlumniManager } from '@alumni-web-app-v2/businessLogic/src/alumniManager';

export class AlumniController {
  public async createAlumni(req: Request, res: Response) {
    const {
      user_id,
      bio,
      company,
      experience_years,
      graduation_year,
      department,
      job_title,
      linkedin_url,
    } = req.body;
    console.log('Received alumni data:', req.body);
    const alumniManager = new AlumniManager();
    try {
      const newAlumni = await alumniManager.createAlumni(
        user_id,
        bio,
        company,
        experience_years,
        graduation_year,
        department,
        job_title,
        linkedin_url
      );
      res
        .status(201)
        .json({ message: 'Alumni created successfully', data: newAlumni });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to create alumni',
        error: (error as Error).message,
      });
    }
  }
  public async updateAlumni(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alumniData = req.body;
      const alumniManager = new AlumniManager();
      const updatedAlumni = await alumniManager.updateAlumni(
        Number(id),
        alumniData
      );
      if (!updatedAlumni) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      return res.status(200).json({
        message: 'Alumni updated successfully',
        data: updatedAlumni,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update alumni',
        error: (error as Error).message,
      });
    }
  }
  public async deleteAlumni(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alumniManager = new AlumniManager();
      const deletedAlumni = await alumniManager.deleteAlumni(Number(id));
      return res.status(200).json({
        message: 'Alumni deleted successfully',
        data: deletedAlumni,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to delete alumni',
        error: (error as Error).message,
      });
    }
  }
  public async getAllAlumni(req: Request, res: Response) {
    try {
      const alumniManager = new AlumniManager();
      const alumniList = await alumniManager.getAllAlumni();
      res
        .status(200)
        .json({ message: 'Alumni retrieved successfully', data: alumniList });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve alumni',
        error: (error as Error).message,
      });
    }
  }
  public async getAllAlumnibyCompany(req: Request, res: Response) {
    try {
      let { company } = req.params;
      company = String(company);
      console.log('Received company parameter:', company);
      const alumniManager = new AlumniManager();

      const alumniList = await alumniManager.getAllAlumnibyCompany(company);
      res
        .status(200)
        .json({ message: 'Alumni retrieved successfully', data: alumniList });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve alumni by company',
        error: (error as Error).message,
      });
    }
  }
  public async getAlumniById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alumniManager = new AlumniManager();
      const alumni = await alumniManager.getAlumniById(Number(id));
      if (!alumni) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      return res.status(200).json({
        message: 'Alumni retrieved successfully',
        data: alumni,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve alumni',
        error: (error as Error).message,
      });
    }
  }
  public async getAllAlumniByUser(req: Request, res: Response) {
    try {
      const { user_id } = req.params;
      const alumniManager = new AlumniManager();
      console.log('Received user_id parameter:', req.params);
      const alumni = await alumniManager.getAllAlumniByUser(Number(user_id));
      if (!alumni) {
        return res.status(404).json({ message: 'Alumni not found' });
      }
      return res.status(200).json({
        message: 'Alumni retrieved successfully',
        data: alumni,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve alumni',
        error: (error as Error).message,
      });
    }
  }
  public async getAllAlumnibyJobTitle(req: Request, res: Response) {
    try {
      const { job_title } = req.params;
      const alumniManager = new AlumniManager();
      const alumniList = await alumniManager.getAllAlumnibyJobTitle(
        String(job_title)
      );
      res
        .status(200)
        .json({ message: 'Alumni retrieved successfully', data: alumniList });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve alumni by job title',
        error: (error as Error).message,
      });
    }
  }
}
