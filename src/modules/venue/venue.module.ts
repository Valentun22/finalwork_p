import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VenuesRepository } from 'src/repository/services/venues.repository'
import { VenueEntity } from './entity/venue.entity'
import { VenueLikeEntity } from './entity/venueLike.entity'
import { VenueService } from './services/venue.service'
import {VenueController} from "./venue.controller";
import {StatisticRepository} from "../../repository/services/statistic.repository";
import {StatisticEntity} from "../statistic/entity/statistic.entity";

@Module({
	imports: [TypeOrmModule.forFeature([VenueEntity, VenueLikeEntity, StatisticEntity])],
	controllers: [VenueController],
	providers: [VenueService, VenuesRepository, StatisticRepository ],
	exports: [VenueService],
})
export class VenueModule {}
