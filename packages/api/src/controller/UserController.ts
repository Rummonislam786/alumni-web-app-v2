import { Request, Response } from 'express';
import { UserManager } from '@alumni-web-app-v2/businessLogic/src/UserManager';
export class UserController {
  public async createUser(req: Request, res: Response) {
    const { name, email, password, role, photo_url } = req.body;
    console.log('Received user data:', req.body);
    const userManager = new UserManager();
    try {
      const newUser = await userManager.createUser(
        name,
        email,
        password,
        role,
        photo_url
      );
      res
        .status(201)
        .json({ message: 'User created successfully', data: newUser });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to create user',
        error: (error as Error).message,
      });
    }
  }
  public async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      const userManager = new UserManager();
      const updatedUser = await userManager.updateUser(Number(id), userData);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
        message: 'User updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update user',
        error: (error as Error).message,
      });
    }
  }
  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userManager = new UserManager();
      const deletedUser = await userManager.deleteUser(Number(id));
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
        message: 'User deleted successfully',
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to delete user',
        error: (error as Error).message,
      });
    }
  }
  public async getAllUsers(req: Request, res: Response) {
    try {
      const userManager = new UserManager();
      const users = await userManager.getAllUsers();
      res
        .status(200)
        .json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve users',
        error: (error as Error).message,
      });
    }
  }
  public async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userManager = new UserManager();
      const user = await userManager.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res
        .status(200)
        .json({ message: 'User retrieved successfully', data: user });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve user',
        error: (error as Error).message,
      });
    }
  }
  public async getUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const userManager = new UserManager();
      const user = await userManager.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res
        .status(200)
        .json({ message: 'User retrieved successfully', data: user });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve user',
        error: (error as Error).message,
      });
    }
  }
  public async getUsersByRole(req: Request, res: Response) {
    try {
      const { role } = req.params;
      const userManager = new UserManager();
      const users = await userManager.getUsersByRole(role);
      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ message: 'No users found with the specified role' });
      }
      res
        .status(200)
        .json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve users',
        error: (error as Error).message,
      });
    }
  }
  public async getUsersByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const userManager = new UserManager();
      const users = await userManager.getUsersByName(name);
      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ message: 'No users found with the specified name' });
      }
      res
        .status(200)
        .json({ message: 'Users retrieved successfully', data: users });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to retrieve users',
        error: (error as Error).message,
      });
    }
  }
}
