import { Local } from 'src/locals/entities/local.entity';
import { Person } from 'src/people/entities/person.entity';

export class Client {
  id: number;
  name: string;
  clientTypeId: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  locals: Local[];
  people: Person[];
}
