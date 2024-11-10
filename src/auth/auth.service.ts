import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PayloadType } from 'src/types/payload.type';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY) private refreshTokenConfig:ConfigType<typeof refreshJwtConfig>
  ) {}

  async login(loginDto: LoginDTO): Promise<{ accessToken: string , refreshToken:string }> {
    
    const user = await this.usersService.findOne({ email: loginDto.email });
    const passwordMatched = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;

      const payload: PayloadType = {
        email: user.email,
        userId: user._id.toString(),
        role: user.role,
      };
      console.log(payload);

      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken:await this.jwtService.signAsync(payload , this.refreshTokenConfig)
      };
    } else {
      throw new UnauthorizedException(`Password does not match`);
    }
     
     
  }

  async refreshToken(id:string) {
        const user = await this.usersService.findById(id)
        const payload: PayloadType = {
          email: user.email,
          userId: user._id.toString(),
          role: user.role,
        };
        console.log(`Refresh Token Payload:${payload}`)
        return {
          token:await this.jwtService.signAsync(payload)
        }
  }
}
