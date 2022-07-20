import { Injectable } from '@nestjs/common';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class LocalsService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  async create(createLocalDto: CreateLocalDto) {
    const local = await this.database.locals.create({ data: createLocalDto });

    return local;
  }

  async findAll() {
    const locals = await this.database.locals.findMany();
    return locals;
  }

  async findOne(id: number) {
    const local = await this.database.locals.findUnique({ where: { id } });
    return local;
  }

  async update(id: number, updateLocalDto: UpdateLocalDto) {
    const local = await this.database.locals.update({
      data: updateLocalDto,
      where: { id },
    });

    return local;
  }

  async remove(id: number) {
    const local = await this.database.locals.delete({ where: { id } });

    return local;
  }
}
