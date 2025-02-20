import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { SKIP_AUTH } from '../constants/constants';
import { TokenType } from '../enums/token-type.enum';
import { AuthCacheService } from '../services/auth-cache.service';
import { TokenService } from '../services/token.service';
import {UserRepository} from "../../../repository/services/user.repository";

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authCacheService: AuthCacheService,
    private tokenService: TokenService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_AUTH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const accessToken = request.get('Authorization')?.split('Bearer ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    const payload = await this.tokenService.verifyToken(
      accessToken,
      TokenType.ACCESS,
    );
    if (!payload) {
      throw new UnauthorizedException();
    }

    const isAccessTokenExist = await this.authCacheService.isAccessTokenExist(
      payload.userId,
      payload.deviceId,
      accessToken,
    );
    if (!isAccessTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: payload.userId,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user = {
      userId: user.id,
      email: user.email,
      deviceId: payload.deviceId,
      role: user.role,
    };
    return true;
  }
}
