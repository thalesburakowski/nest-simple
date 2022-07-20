import { CreateLocalDto } from 'src/locals/dto/create-local.dto';
import { CreatePersonDto } from 'src/people/dto/create-person.dto';

export class CreateClientDto {
  name: string;
  clientTypeId: number;
  createdBy: string;
  updatedBy: string;
  locals: CreateLocalDto[];
  people: CreatePersonDto[];
}
