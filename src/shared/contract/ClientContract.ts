import { Client, ClientInterface } from "../interface";

export interface ClientContract {
    createClient(client: ClientInterface): Promise<void>;

    updateClient(id: string, clientUpdated: ClientInterface): Promise<void>;

    deleteClient(id: string): Promise<void>;

    getClient(id: string): Promise<Client>;

    getClients(): Promise<Client[]>;
}