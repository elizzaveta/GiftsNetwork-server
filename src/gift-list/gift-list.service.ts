import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftListEntity } from './models/gift-list.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateGiftListDto } from './dto/create-gift-list.dto';
import { GiftListMapper } from './mapper/gift-list.mapper';
import { GetGiftListDTO } from './dto/get-gifts-list-dto';

@Injectable()
export class GiftListService {
  constructor(
    @InjectRepository(GiftListEntity)
    private giftListRepository: Repository<GiftListEntity>,
    private giftListMapper: GiftListMapper,
  ) {}

  async getAll(): Promise<GetGiftListDTO[]> {
    const giftList: GiftListEntity[] = await this.giftListRepository.find({
      relations: ['user'],
    });

    const mappedGiftList: Promise<GetGiftListDTO>[] = giftList.map(
      (giftListItem) => this.giftListMapper.toDTO(giftListItem),
    );

    return await Promise.all(mappedGiftList);
  }

  async getById(id: number): Promise<GetGiftListDTO> {
    const giftListItem: GiftListEntity = await this.giftListRepository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    return this.giftListMapper.toDTO(giftListItem);
  }

  async create(giftListDTO: CreateGiftListDto): Promise<GiftListEntity> {
    const giftListEntity: GiftListEntity = await this.giftListMapper.toEntity(
      giftListDTO,
    );
    return this.giftListRepository.save(giftListEntity);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.giftListRepository.delete({ id });
  }

  async toggleArchivedStatus(id: number) {
    const giftListItem: GiftListEntity = await this.giftListRepository.findOne({
      where: { id },
    });
    if (!giftListItem)
      throw new NotFoundException('Gift with such id is not found');

    giftListItem.isArchived = !giftListItem.isArchived;
    return this.giftListRepository.save(giftListItem);
  }
}
