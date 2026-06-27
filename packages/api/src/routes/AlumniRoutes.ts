import { Router } from 'express';
import { AlumniController } from '../controller/AlumniController';
const router = Router();
const alumniControllerInstance = new AlumniController();

router.post('/alumni', alumniControllerInstance.createAlumni);
router.put('/alumni/:id', alumniControllerInstance.updateAlumni);
router.delete('/alumni/:id', alumniControllerInstance.deleteAlumni);
router.get('/alumni', alumniControllerInstance.getAllAlumni);
router.get(
  '/alumni/company/:company',
  alumniControllerInstance.getAllAlumnibyCompany
);
router.get('/alumni/:id', alumniControllerInstance.getAlumniById);
router.get(
  '/alumni/user/:user_id',
  alumniControllerInstance.getAllAlumniByUser
);
router.get(
  '/alumni/jobtitle/:job_title',
  alumniControllerInstance.getAllAlumnibyJobTitle
);

export default router;
