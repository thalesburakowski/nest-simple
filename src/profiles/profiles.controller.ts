import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(+id, updateProfileDto);
  }

  @Delete(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.profilesService.remove(+id);
  }
}
