import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { redisClient } from 'src/services/redis';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { UpdateManyClientDto } from './dto/update-many-client.dto';

// adicionado roles das rotas
// adicionado role guard
// adicionado redis

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @Roles('super')
  @UseGuards(RoleGuard)
  async create(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientsService.create(createClientDto);
    await redisClient.setRedis('clients', undefined);
    return client;
  }

  @Get()
  @Roles('super')
  @UseGuards(RoleGuard)
  async findAll() {
    const cachedClients = await redisClient.getRedis('clients');
    if (cachedClients) {
      return JSON.parse(cachedClients);
    }
    const clients = await this.clientsService.findAll();
    if (clients) {
      await redisClient.setRedis('clients', JSON.stringify(clients));
    }
    return clients;
  }

  @Get(':id')
  @Roles('super')
  @UseGuards(RoleGuard)
  async findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @Put('/replace')
  @Roles('super')
  @UseGuards(RoleGuard)
  async updateMany(@Body() updateManyClientDto: UpdateManyClientDto) {
    const clients = await this.clientsService.updateManyByIds(
      updateManyClientDto,
    );
    await redisClient.setRedis('clients', undefined);
    return clients;
  }

  @Put(':id')
  @Roles('super')
  @UseGuards(RoleGuard)
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    const clientsUpdated = await this.clientsService.update(
      +id,
      updateClientDto,
    );
    await redisClient.setRedis('clients', undefined);
    return clientsUpdated;
  }

  @Delete(':id')
  @Roles('super')
  @UseGuards(RoleGuard)
  async remove(@Param('id') id: string) {
    await this.clientsService.remove(+id);
    await redisClient.setRedis('clients', undefined);
  }
}
