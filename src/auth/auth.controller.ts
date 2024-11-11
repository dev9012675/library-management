import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dtos/create-user-dto';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';

import { ValidationPipe, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt/jwt-guard';
import { ValidateTokenDTO } from './dtos/validate-token.dto';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './guards/refresh/refresh.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post('signup')
  signup(@Body() userDTO: CreateUserDTO): Promise<User> {
    return this.userService.create(userDTO);
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(RefreshAuthGuard)
  @Post(`refresh`)
  async refreshToken(@Req() req) {
    return await this.authService.refreshToken(req.user.userId);
  }

  @Post(`signout`)
  @UseGuards(JwtAuthGuard)
  async signout(@Req() req) {
    await this.authService.signout(req.user.userId);
    return {
      message:`You have signed out`
    }
  }
}
