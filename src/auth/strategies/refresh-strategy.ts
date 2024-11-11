import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadType } from 'src/types/payload.type';
import * as dotenv from 'dotenv';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
dotenv.config();

@Injectable()
export class RefreshJWTStrategy extends PassportStrategy(
  Strategy,
  `refresh-jwt`,
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: refreshJwtConfiguration.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: PayloadType) {
    const refreshToken = req.get(`authorization`).replace(`Bearer`, ``).trim();
    const id = payload.userId;
    return await this.authService.validateRefreshToken(id, refreshToken);
  }
}
