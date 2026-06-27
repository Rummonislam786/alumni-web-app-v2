import { UserDTO } from '@alumni-web-app-v2/dal/src/DTOs/user';
import { UserQuery } from '@alumni-web-app-v2/dal/src/query/UserQuery';
export class UserManager {
  public async getUserByEmail(Email: any) {
    // Implementation to get user by email
    const userQuery = new UserQuery();
    //convert email to string if it's not already
    if (typeof Email !== 'string') {
      Email = String(Email);
    }
    const user = await userQuery.getUserByEmail(Email);
    return user;
  }
  public async getUserById(Userid: number) {
    // Implementation to get user by ID
    const userQuery = new UserQuery();
    const user = await userQuery.getUserById(Userid);
    return user;
  }
  public async getUsersByRole(Role: any) {
    // Implementation to get users by role
    const userQuery = new UserQuery();
    //convert role to string if it's not already
    if (typeof Role !== 'string') {
      Role = String(Role);
    }
    const users = await userQuery.getUsersByRole(Role);
    return users;
  }
  public async createUser(
    Name: string,
    Email: string,
    Password: string,
    Role: string,
    photo_url?: string | null
  ) {
    // Implementation to create a new user
    const userQuery = new UserQuery();
    const user = new UserDTO(Name, Email, Password, Role, photo_url);
    const newUser = await userQuery.createUser(user);
    return newUser;
  }
  public async updateUser(Userid: number, data: Record<string, any>) {
    // Implementation to update user details
    const userQuery = new UserQuery();
    const allowedFields = ['Name', 'Email', 'Password', 'Role', 'photo_url'];
    const user: Record<string, any> = {};
    for (const key of allowedFields) {
      if (key in user) {
        data[key] = (user as any)[key];
      }
    }
    if (Object.keys(data).length === 0) {
      throw new Error('No valid fields to update');
    }
    return await userQuery.updateUser(Userid, data);
  }

  public async deleteUser(Userid: number) {
    // Implementation to delete a user
    const userQuery = new UserQuery();
    const deletedUser = await userQuery.deleteUser(Userid);
    return deletedUser;
  }
  public async getAllUsers() {
    // Implementation to get all users
    const userQuery = new UserQuery();
    const users = await userQuery.getAllUsers();
    return users;
  }
  public async getUsersByName(Name: any) {
    // Implementation to get users by name
    const userQuery = new UserQuery();
    //convert name to string if it's not already
    if (typeof Name !== 'string') {
      Name = String(Name);
    }
    const users = await userQuery.getUsersByName(Name);
    return users;
  }
}
