import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm'
import { BaseModel } from '../../../database/entities/models/base.model'
import { TableNameEnum } from '../../../database/enums/table-name.enum'
import { FavoriteEntity } from '../../favorite/entities/favorite.entity'
import { NewsEntity } from '../../news/entity/news.entity'
import { ReviewEntity } from '../../review/entities/review.entity'
import { UserEntity } from '../../user/entity/user.entity'
import {StatusTypeEnum} from "../../../database/enums/status-type.enum";
import {StatisticEntity} from "../../statistic/entity/statistic.entity";

@Entity(TableNameEnum.VENUES)
export class VenueEntity extends BaseModel {
	@Column()
	name: string

	@Column('text', { nullable: true })
	image?: string

	@Column('text')
	body: string

	@Column('text')
	title: string

	@Column('text', { nullable: true })
	photos: string[]

	@Column()
	location: string

	@Column({ type: 'float' })
	averageCheck: number

	@Column()
	workingHours: string

	@Column()
	contactInfo: string

	@Column('simple-array')
	tags: string[]

	@Column({ type: 'text', nullable: true })
	description?: string

	@Column('simple-array', { nullable: true })
	menu?: string[]

	@Column({ type: 'float', nullable: true })
	latitude?: number

	@Column({ type: 'float', nullable: true })
	longitude?: number

	@Column({ default: 0 })
	likes: number

	@Column({
		type: 'enum',
		enum: StatusTypeEnum,
		default: StatusTypeEnum.INACTIVE,
	})
	status: StatusTypeEnum

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	publicationDate: Date

	@Column({ nullable: true })
	updated_at?: string

	@Column({ type: 'float', nullable: true })
	rating?: number

	@Column({ nullable: true })
	type?: string

	@Column('simple-json', { nullable: true })
	features?: {
		wifi: boolean
		parking: boolean
		liveMusic: boolean
	}

	@OneToMany(() => StatisticEntity, (statistic) => statistic.venue, {
		nullable: true,
		cascade: true
	})
	statistics: StatisticEntity[]

	@Column()
	userId: string
	@ManyToOne(() => UserEntity, user => user.venues)
	@JoinColumn({ name: 'userId' })
	user?: UserEntity

	@ManyToOne(() => UserEntity, user => user.venues)
	owner: UserEntity

	@OneToMany(() => ReviewEntity, review => review.venue)
	reviews: ReviewEntity[]

	@OneToMany(() => NewsEntity, news => news.venue)
	news: NewsEntity[]

	@OneToMany(() => FavoriteEntity, favorite => favorite.venue)
	favorites: FavoriteEntity[]
}
