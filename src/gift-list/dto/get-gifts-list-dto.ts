import { IsBoolean, IsNumber, IsString, Max, Min } from 'class-validator';
import { GetUserDTO } from '../../user/dto/get-user.dto';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class GetGiftListDTO {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @Type(() => GetUserDTO)
  user: GetUserDTO;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsBoolean()
  isArchived: boolean;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
  degreeOfDesire: number;
}
