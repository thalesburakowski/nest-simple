import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

@Injectable()
export class PeopleService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  async create(createPersonDto: CreatePersonDto) {
    const local = await this.database.people.create({ data: createPersonDto });

    return local;
  }

  async findAll() {
    const locals = await this.database.people.findMany();
    return locals;
  }

  async findOne(id: number) {
    const local = await this.database.people.findUnique({ where: { id } });
    return local;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const local = await this.database.people.update({
      data: updatePersonDto,
      where: { id },
    });

    return local;
  }

  async remove(id: number) {
    const local = await this.database.people.delete({ where: { id } });

    return local;
  }
}
