import { UserRepository } from '@alumni-web-app-v2/dal';
import {
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
} from '@alumni-web-app-v2/shared';
import { AlumniService } from './AlumniService';

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepository.create(data);
    return user;
  }
  async updateUser(id: number, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.userRepository.update(id, data);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getUserById(id: number): Promise<UserResponseDTO | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }
  async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
  async getUsersByRole(role: string): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.filter((user) => user.Role === role);
  }
  async getUsersByName(name: string): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.filter((user) =>
      user.Name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getUsersByEmail(email: string): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.filter((user) =>
      user.Email.toLowerCase().includes(email.toLowerCase())
    );
  }
}
