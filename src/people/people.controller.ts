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
import { PeopleService } from './people.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @Roles('super', 'basic')
  @UseGuards(RoleGuard)
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
