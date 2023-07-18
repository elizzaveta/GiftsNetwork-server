import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // const authService = app.get(AuthService);
  // const userService = app.get(UserService);
  // const roleService = app.get(RoleService);
  //
  // const roles = await roleService.getAll();
  // if (roles.length === 0) {
  //   await roleService.create([
  //     {
  //       name: 'admin',
  //     },
  //     {
  //       name: 'user',
  //     },
  //   ]);
  // }

  // try {
  //   await userService.getByPhoneNumber('+000000000000');
  // } catch (e) {
  //   await authService.signup({
  //     firstName: 'admin',
  //     lastName: 'admin',
  //     phone: '+000000000000',
  //     email: 'admin@gmail.com',
  //     password: 'admin<123>',
  //     birthday: new Date('2000-01-01'),
  //     role: await roleService.getById(1),
  //   });
  // }

  await app.listen(8080);
}

bootstrap();
