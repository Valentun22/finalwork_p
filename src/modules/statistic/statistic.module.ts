import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatisticEntity } from './entity/statistic.entity'
import { StatisticController } from './statistic.controller'
import {StatisticService} from "./services/statistic.service";

@Module({
	imports: [TypeOrmModule.forFeature([StatisticEntity])],
	controllers: [StatisticController],
	providers: [StatisticService],
	exports: [StatisticService],
})
export class StatisticModule {}
