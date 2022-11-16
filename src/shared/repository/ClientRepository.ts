
import { ClientContract } from "../contract";
import { Client, ClientInterface } from "../interface";
import { httpClient } from "../utils";

const route = 'http://localhost:8000/clients';

export class ClientRepository implements ClientContract {

    async createClient(client: ClientInterface): Promise<void> {
      const { data: response } = await httpClient.post(route, client);
      return response;
    }

    async updateClient(id: string, clientUpdated: ClientInterface): Promise<void> {
        const { data: response } = await httpClient.put(`${route}/${id}`, clientUpdated);
        return response;
      }

    async deleteClient(id: string): Promise<void> {
        const { data: response } = await httpClient.delete(`${route}/${id}`);
        return response;
      }

    async getClient(id: string): Promise<Client> {
        const { data: response } = await httpClient.get(`${route}/${id}`);
        return response;
      }

    async getClients(): Promise<Client[]> {
        const { data: response } = await httpClient.get(route);
        return response;
      }
}