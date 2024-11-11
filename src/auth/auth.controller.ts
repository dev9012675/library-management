import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
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
import { Request, Response } from 'express';

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
  async login(@Body() loginDto: LoginDTO , @Res({ passthrough: true }) response:Response) {
    const userData = await this.authService.login(loginDto);
    const Options = {
      httpOnly: true,
      secure: true,
    };
    response.cookie('accessToken', userData.accessToken, Options);
    response.cookie('refreshToken', userData.refreshToken, Options);
    return userData

  }

  @UseGuards(RefreshAuthGuard)
  @Post(`refresh`)
  async refreshToken(@Req() req , 
  @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.refreshToken(req.user.userId);
    const Options = {
      httpOnly: true,
      secure: true,
    };
    response.cookie('accessToken', tokens.accessToken, Options);
    response.cookie('refreshToken', tokens.refreshToken, Options);
    return tokens
  }

  @Post(`signout`)
  @UseGuards(JwtAuthGuard)
  async signout(@Req() req ,  @Res({ passthrough: true }) response: Response){
    const signOut = await this.authService.signout(req.user.userId);
    const Options = {
      httpOnly: true,
      secure: true,
    };
    if (signOut) {
      response.clearCookie('accessToken' , Options);
      response.clearCookie('refreshToken' , Options);
    }
    
    return signOut
  }
}
