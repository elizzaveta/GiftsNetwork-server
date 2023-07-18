import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AccessTokenDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  access_token: string;
}
