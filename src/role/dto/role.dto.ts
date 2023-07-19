import { IsNotEmpty, IsString } from 'class-validator';

export class RoleDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
