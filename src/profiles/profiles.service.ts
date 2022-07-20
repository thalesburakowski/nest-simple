import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  database: PrismaClient;

  constructor() {
    this.database = new PrismaClient();
  }

  async create(createProfileDto: CreateProfileDto) {
    const profile = await this.database.profiles.create({
      data: createProfileDto,
    });

    return profile;
  }

  async findAll() {
    const profiles = await this.database.profiles.findMany();
    return profiles;
  }

  async findOne(id: number) {
    const profile = await this.database.profiles.findUnique({ where: { id } });
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.database.profiles.update({
      data: updateProfileDto,
      where: { id },
    });

    return profile;
  }

  async remove(id: number) {
    const profile = await this.database.profiles.delete({ where: { id } });

    return profile;
  }
}
