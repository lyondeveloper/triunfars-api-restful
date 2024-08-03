import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  Strategy,
  ExtractJwt,
} from 'passport-jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

    delete user.password;

    return user;
  }
}
