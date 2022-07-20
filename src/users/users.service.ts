import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.database.users.create({ data: createUserDto });

    return user;
  }

  async findAll() {
    const users = await this.database.users.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.database.users.findUnique({ where: { id } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.database.users.update({
      data: updateUserDto,
      where: { id },
    });

    return user;
  }

  async remove(id: number) {
    const user = await this.database.users.delete({ where: { id } });

    return user;
  }
}
