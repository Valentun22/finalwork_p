import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignboardEntity } from './entity/signboard.entity';
import { SignboardController } from './signboard.controller';
import { StatisticEntity } from '../statistic/entity/statistic.entity';
import { VenueEntity } from '../venue/entity/venue.entity';
import { SignboardRepository } from '../../repository/services/signboard.repository';
import { VenuesRepository } from '../../repository/services/venues.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { UserEntity } from '../user/entity/user.entity';
import { UserRepository } from '../../repository/services/user.repository';
import { MoreSignboardAllowedGuard } from './guards/more-signboard-allowed.guard';
import {SignboardService} from "./services/signboard.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SignboardEntity,
            VenueEntity,
            StatisticEntity,
            UserEntity
        ])
    ],
    controllers: [SignboardController],
    providers: [
        SignboardService,
        SignboardRepository,
        VenuesRepository,
        StatisticRepository,
        UserRepository,
        MoreSignboardAllowedGuard
    ],
    exports: [SignboardService],
})
export class SignboardModule {}
