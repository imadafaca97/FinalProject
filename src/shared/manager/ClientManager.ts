import { Client, ClientInterface } from "@shared/interface";
import { ClientContract } from "../contract/ClientContract";

export class ClientManager {
    private static instance: ClientManager;
  
    private constructor(private clientRepository: ClientContract) {
      this.clientRepository = clientRepository;
    }

    static getInstance(): ClientManager {
      return ClientManager.instance;
    }
  
    static build(clientRepository: ClientContract): ClientManager {
      ClientManager.instance = new ClientManager(clientRepository);
      return this.getInstance();
    }

    async createClient(client: ClientInterface): Promise<void> {
      return this.clientRepository.createClient(client);
    }

    async updateClient(id: string, clientUpdated: ClientInterface): Promise<void> {
      return this.clientRepository.updateClient(id, clientUpdated);
    }

    async deleteClient(id: string): Promise<void> {
      return this.clientRepository.deleteClient(id);
    }

    async getClient(id: string): Promise<Client> {
      return this.clientRepository.getClient(id);
    }

    async getClients(): Promise<Client[]> {
      return this.clientRepository.getClients();
    }
  
}