import { UserContract } from "@shared/contract/UserContract";
import { LoginInterface, User, UserInterface } from "@shared/interface";

export class UserManager {
    private static instance: UserManager;
  
    private constructor(private userRepository: UserContract) {
      this.userRepository = userRepository;
    }

    static getInstance(): UserManager {
      return UserManager.instance;
    }
  
    static build(userRepository: UserContract): UserManager {
        UserManager.instance = new UserManager(userRepository);
      return this.getInstance();
    }

    async login(login: LoginInterface): Promise<void> {
      return this.userRepository.login(login);
    }

      async createUser(User: UserInterface): Promise<void> {
        return this.userRepository.createUser(User);
      }
  
      async updateUser(id: string, UserUpdated: UserInterface): Promise<void> {
        return this.userRepository.updateUser(id, UserUpdated);
      }
  
      async deleteUser(id: string): Promise<void> {
        return this.userRepository.deleteUser(id);
      }
  
      async getUser(id: string): Promise<User> {
        return this.userRepository.getUser(id);
      }
  
      async getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
      }
  
}