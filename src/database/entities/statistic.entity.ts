import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm'
import { TableNameEnum } from '../enums/table-name.enum'
import { BaseModel } from './models/base.model'
import {VenueEntity} from "../../modules/venue/entity/venue.entity";

@Entity(TableNameEnum.STATISTICS)
export class StatisticEntity extends BaseModel {
	@Column()
	venueId: string

	@ManyToOne(() => VenueEntity)
	@JoinColumn({ name: 'venueId' })
	venue: VenueEntity
}
