import { CreateClientDto } from './create-client.dto';

export class UpdateManyClientDto {
  targetIds: number[];
  attributes: keyof CreateClientDto;
  value: any;
}
