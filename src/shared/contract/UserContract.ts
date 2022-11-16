import { LoginInterface, User, UserInterface } from "../interface";

export interface UserContract {
    login(login: LoginInterface): Promise<void>;
    createUser(login: UserInterface): Promise<void>;

    updateUser(id: string, UserUpdated: UserInterface): Promise<void>;

    deleteUser(id: string): Promise<void>;

    getUser(id: string): Promise<User>;

    getUsers(): Promise<User[]>;
}