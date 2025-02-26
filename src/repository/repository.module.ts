import { Global, Module } from '@nestjs/common';

import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';
import { VenuesRepository } from "./services/venues.repository";
import {StatisticRepository} from "./services/statistic.repository";

const repositories = [
  UserRepository,
  RefreshTokenRepository,
  VenuesRepository,
  StatisticRepository,
];
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}
