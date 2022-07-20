export class CreatePersonDto {
  name: string;
  documentNumber: string;
  createdBy: string;
  updatedBy: string;
  clientId?: number;
}
