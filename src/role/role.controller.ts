import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './dto/role.dto';
import { from, Observable } from 'rxjs';
import { RoleEntity } from './models/role.entity';
import { DeleteResult } from 'typeorm';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  create(@Body() roleDTO: RoleDTO): Observable<RoleEntity> {
    return from(this.roleService.create(roleDTO));
  }

  @Get()
  get(): Observable<RoleEntity[]> {
    return from(this.roleService.getAll());
  }

  @Get('/:id')
  getById(@Param('id') id: number): Observable<RoleEntity> {
    return from(this.roleService.getById(id));
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() roleDTO: RoleDTO,
  ): Observable<RoleEntity> {
    return from(this.roleService.update(id, roleDTO));
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return from(this.roleService.delete(id));
  }
}
