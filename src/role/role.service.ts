import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './models/role.entity';
import { DeleteResult, Repository } from 'typeorm';
import { RoleDTO } from './dto/role.dto';
import { RoleMapper } from './mapper/role.mapper';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    private roleMapper: RoleMapper,
  ) {}

  async create(roleDTO: RoleDTO): Promise<RoleEntity> {
    const role: RoleEntity = this.roleMapper.toEntity(roleDTO);
    return this.roleRepository.save(role);
  }

  async get(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async getById(id: number) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async update(id: number, roleDTO: RoleDTO): Promise<RoleEntity> {
    await this.roleRepository.update({ id: id }, roleDTO);
    return this.roleRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.roleRepository.delete({ id: id });
  }
}
