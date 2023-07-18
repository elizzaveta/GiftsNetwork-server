import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../user/models/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenDto,
  LoginWithEmailDto,
  LoginWithNicknameDto,
  SignupDto,
} from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  private async verifyPassword(databasePasswordHash, loginDataPassword) {
    const passwordIsCorrect: boolean = await argon.verify(
      databasePasswordHash,
      loginDataPassword,
    );
    if (!passwordIsCorrect) throw new ForbiddenException('Incorrect password');
  }

  private async grantAccessToken(
    nickname: string,
    id: number,
  ): Promise<AccessTokenDto> {
    const payload = { nickname: nickname, id: id };
    return {
      id: id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(signupData: SignupDto): Promise<UserEntity> {
    const existingUser: UserEntity | null = await this.userRepository.findOne({
      where: [{ email: signupData.email }, { nickname: signupData.nickname }],
    });

    if (existingUser) {
      if (existingUser.email === signupData.email) {
        throw new BadRequestException('User with this email already exists.');
      }
      if (existingUser.nickname === signupData.nickname) {
        throw new BadRequestException('This nickname is already taken.');
      }
    }

    const passwordHash: string = await argon.hash(signupData.password);
    const newUser: UserEntity = this.userRepository.create({
      ...signupData,
      password: passwordHash,
    });

    const createdUser: UserEntity = await this.userRepository.save(newUser);
    if (createdUser) {
      delete createdUser.password;
      return createdUser;
    }
  }

  async loginWithNickname(
    loginData: LoginWithNicknameDto,
  ): Promise<AccessTokenDto> {
    const targetUser: UserEntity | null = await this.userRepository.findOne({
      where: [{ nickname: loginData.nickname }],
    });

    if (!targetUser) {
      throw new NotFoundException(
        'No account with this nickname. Check spelling or sign up.',
      );
    }

    await this.verifyPassword(targetUser.password, loginData.password);
    return await this.grantAccessToken(targetUser.nickname, targetUser.id);
  }
  async loginWithEmail(loginData: LoginWithEmailDto): Promise<AccessTokenDto> {
    const targetUser: UserEntity | null = await this.userRepository.findOne({
      where: [{ nickname: loginData.email }],
    });

    if (!targetUser) {
      throw new NotFoundException(
        'No account with this email. Check spelling or sign up.',
      );
    }

    await this.verifyPassword(targetUser.password, loginData.password);
    return await this.grantAccessToken(targetUser.nickname, targetUser.id);
  }
}
