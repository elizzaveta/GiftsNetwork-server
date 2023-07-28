import { IsDate, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsDate()
  @IsOptional()
  birthday: Date;
}
