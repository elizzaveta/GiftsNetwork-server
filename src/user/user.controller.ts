import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { from, Observable } from 'rxjs';
import { UserEntity } from './models/user.entity';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Observable<UserEntity[]> {
    return from(this.userService.getAll());
  }

  @Get('id/:id')
  getById(@Param('id') id: number): Observable<UserEntity> {
    return from(this.userService.getById(id));
  }

  @Get('@:nickname')
  getByNickname(@Param('nickname') nickname: string): Observable<UserEntity> {
    return from(this.userService.getByNickname(nickname));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Observable<UserEntity> {
    return from(this.userService.update(id, updateUserDTO));
  }
}
