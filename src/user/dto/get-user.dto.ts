import {
  IsDate,
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class GetUserDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  nickname: string;

  @Expose()
  @IsPhoneNumber()
  phone: string;

  @Expose()
  @IsDate()
  birthday: Date;
}
