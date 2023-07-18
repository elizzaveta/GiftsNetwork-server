import { IsNotEmpty, IsString } from 'class-validator';

export class LoginWithNicknameDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
