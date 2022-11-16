import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInterface } from 'src/interfaces/LoginInterface';
import { User, UserDocument } from 'src/schemas/User.Schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    return new this.userModel(createUserDto).save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
  async login(createUserDto: LoginInterface): Promise<User> {
    return this.userModel.findOne({
      username: createUserDto.username,
      password: createUserDto.password,
    });
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ id }, { $set: { ...updateUserDto } });
  }

  async remove(id: string) {
    return this.userModel.deleteOne({ id });
  }
}
