import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config, JwtConfig } from '../../../configs/config.type';
import { AUTH_CACHE } from '../constants/constants';
import {RedisService} from "../../../repository/redis/services/redis.service";

@Injectable()
export class AuthCacheService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<Config>,
  ) {
    this.jwtConfig = this.configService.get<JwtConfig>('jwt');
  }

  public async saveToken(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<void> {
    const key = `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`;

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, accessToken);
    await this.redisService.expire(key, this.jwtConfig.accessExpiresIn);
  }

  public async removeToken(userId: string, deviceId: string): Promise<void> {
    await this.redisService.deleteByKey(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    accessToken: string,
  ): Promise<boolean> {
    const userAccessTokens = await this.redisService.sMembers(
      `${AUTH_CACHE.ACCESS_TOKEN}:${userId}:${deviceId}`,
    );
    return userAccessTokens.some((token: string) => token === accessToken);
  }
}
