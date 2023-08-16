import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateGiftListDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  degreeOfDesire: number;
}
