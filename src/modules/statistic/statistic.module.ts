import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StatisticEntity } from './entity/statistic.entity'
import { StatisticService } from './statistic.service'
import { StatisticController } from './statistic.controller'

@Module({
	imports: [TypeOrmModule.forFeature([StatisticEntity])],
	controllers: [StatisticController],
	providers: [StatisticService],
	exports: [StatisticService],
})
export class StatisticModule {}
