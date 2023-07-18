import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AccessTokenDto,
  LoginWithEmailDto,
  LoginWithNicknameDto,
  SignupDto,
} from './dto';
import { from, Observable } from 'rxjs';
import { UserEntity } from '../user/models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupData: SignupDto): Observable<UserEntity> {
    return from(this.authService.signup(signupData));
  }

  @Post('login-with-nickname')
  loginWithNickname(
    @Body() loginData: LoginWithNicknameDto,
  ): Observable<AccessTokenDto> {
    return from(this.authService.loginWithNickname(loginData));
  }

  @Post('login-with-email')
  loginWithEmail(
    @Body() loginData: LoginWithEmailDto,
  ): Observable<AccessTokenDto> {
    return from(this.authService.loginWithEmail(loginData));
  }
}
