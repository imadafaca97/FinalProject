import { Injectable } from '@nestjs/common';
import { Client, ClientDocument } from 'src/schemas/Client.Schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    return new this.clientModel(createClientDto).save();
  }

  async findAll(): Promise<Client[]> {
    return this.clientModel.find();
  }

  async findOne(id: string): Promise<Client> {
    return this.clientModel.findOne({ id });
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return this.clientModel.updateOne({ id }, { $set: { ...updateClientDto } });
  }

  async remove(id: string) {
    return this.clientModel.deleteOne({ id });
  }
}
