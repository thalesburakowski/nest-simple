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
import { LocalsService } from './locals.service';
import { CreateLocalDto } from './dto/create-local.dto';
import { UpdateLocalDto } from './dto/update-local.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('locals')
export class LocalsController {
  constructor(private readonly localsService: LocalsService) {}

  @Post()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  create(@Body() createLocalDto: CreateLocalDto) {
    return this.localsService.create(createLocalDto);
  }

  @Get()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findAll() {
    return this.localsService.findAll();
  }

  @Get(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.localsService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updateLocalDto: UpdateLocalDto) {
    return this.localsService.update(+id, updateLocalDto);
  }

  @Delete(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.localsService.remove(+id);
  }
}
