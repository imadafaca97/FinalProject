
import { UserContract } from "@shared/contract/UserContract";
import { LoginInterface, User, UserInterface } from "../interface";
import { httpClient } from "../utils";

const route = 'http://localhost:8000/users';

export class UserRepository implements UserContract {

    async login(login: LoginInterface): Promise<void> {
      const { data: response } = await httpClient.post('http://localhost:8000/users/login', login);
      return response;
    }
    async createUser(user: UserInterface): Promise<void> {
      const { data: response } = await httpClient.post(route, user);
      return response;
    }
    async updateUser(id: string, UserUpdated: UserInterface): Promise<void> {
      const { data: response } = await httpClient.put(`${route}/${id}`, UserUpdated);
      return response;
    }

    async deleteUser(id: string): Promise<void> {
        const { data: response } = await httpClient.delete(`${route}/${id}`);
        return response;
      }

    async getUser(id: string): Promise<User> {
        const { data: response } = await httpClient.get(`${route}/${id}`);
        return response;
      }

    async getUsers(): Promise<User[]> {
        const { data: response } = await httpClient.get(route);
        return response;
      }
}