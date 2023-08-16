import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GiftListService } from './gift-list.service';
import { CreateGiftListDto } from './dto/create-gift-list.dto';
import { from, Observable } from 'rxjs';
import { GiftListEntity } from './models/gift-list.entity';
import { GetGiftListDTO } from './dto/get-gifts-list-dto';
import { DeleteResult } from 'typeorm';

@Controller('gift-list')
export class GiftListController {
  constructor(private giftListService: GiftListService) {}

  @Get()
  getAll(): Observable<GetGiftListDTO[]> {
    return from(this.giftListService.getAll());
  }

  @Get('/:id')
  getById(@Param('id') id: number): Observable<GetGiftListDTO> {
    return from(this.giftListService.getById(id));
  }

  // get by user
  @Get('/user/:id')
  getByUserId(@Param('id') id: number): Observable<GiftListEntity[]> {
    return from(this.giftListService.getByUserId(id));
  }

  @Post()
  create(@Body() giftListDTO: CreateGiftListDto): Observable<GiftListEntity> {
    return from(this.giftListService.create(giftListDTO));
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return from(this.giftListService.delete(id));
  }

  @Patch('/:id/toggle-archived-status')
  toggleArchivedStatus(@Param('id') id: number): Observable<GiftListEntity> {
    return from(this.giftListService.toggleArchivedStatus(id));
  }
}
