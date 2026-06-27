import { Router } from 'express';
import { UserController } from '../controller/UserController';
const router = Router();
const userControllerInstance = new UserController();

router.post('/users', userControllerInstance.createUser);
router.put('/users/:id', userControllerInstance.updateUser);
router.delete('/users/:id', userControllerInstance.deleteUser);
router.get('/users', userControllerInstance.getAllUsers);
router.get('/users/:id', userControllerInstance.getUserById);
router.get('/users/name/:name', userControllerInstance.getUsersByName);
router.get('/users/email/:email', userControllerInstance.getUserByEmail);
router.get('/users/role/:role', userControllerInstance.getUsersByRole);

export default router;
