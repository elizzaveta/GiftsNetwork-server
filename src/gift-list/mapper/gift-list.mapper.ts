import { Injectable } from '@nestjs/common';
import { CreateGiftListDto } from '../dto/create-gift-list.dto';
import { GiftListEntity } from '../models/gift-list.entity';
import { UserService } from '../../user';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { GetGiftListDTO } from '../dto/get-gifts-list-dto';

@Injectable()
export class GiftListMapper {
  constructor(private userService: UserService) {}
  async toEntity(giftListDTO: CreateGiftListDto): Promise<GiftListEntity> {
    const gift: GiftListEntity = new GiftListEntity();
    gift.user = await this.userService.getById(giftListDTO.userId);
    gift.name = giftListDTO.name;
    gift.description = giftListDTO.description;
    gift.isArchived = false;
    gift.degreeOfDesire = giftListDTO.degreeOfDesire;
    return gift;
  }

  async toDTO(gifListEntity: GiftListEntity): Promise<GetGiftListDTO> {
    const options: ClassTransformOptions = {
      strategy: 'excludeAll',
    };
    return plainToClass(GetGiftListDTO, gifListEntity, options);
  }
}
