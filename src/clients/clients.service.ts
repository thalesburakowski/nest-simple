import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateManyClientDto } from './dto/update-many-client.dto';

// adicionado transactions

@Injectable()
export class ClientsService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  async create(createClientDto: CreateClientDto) {
    const [clients] = await this.database.$transaction([
      this.database.clients.create({
        data: {
          name: createClientDto.name,
          clientTypeId: createClientDto.clientTypeId,
          createdBy: createClientDto.createdBy,
          updatedBy: createClientDto.updatedBy,
          locals: { create: createClientDto.locals },
          people: { create: createClientDto.people },
        },
      }),
    ]);

    return clients;
  }

  async findAll() {
    const clients = await this.database.clients.findMany();
    return clients;
  }

  async findOne(id: number) {
    const client = await this.database.clients.findUnique({ where: { id } });

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const [client] = await this.database.$transaction([
      this.database.clients.update({
        data: updateClientDto,
        where: { id },
      }),
    ]);

    return client;
  }

  async updateManyByIds(updateClientDto: UpdateManyClientDto) {
    const [clients] = await this.database.$transaction([
      this.database.clients.updateMany({
        data: { [updateClientDto.attributes]: updateClientDto.value },
        where: { id: { in: updateClientDto.targetIds } },
      }),
    ]);

    return clients;
  }

  async remove(id: number) {
    const [client] = await this.database.$transaction([
      this.database.clients.delete({ where: { id } }),
    ]);

    return client;
  }
}
