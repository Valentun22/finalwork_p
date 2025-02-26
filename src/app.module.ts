import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { VenueModule } from './modules/venue/venue.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { CriticModule } from './modules/critic/critic.module'
import { FavoriteModule } from './modules/favorite/favorite.module'
import { ReviewModule } from './modules/review/review.module'
import { NewsModule } from './modules/news/news.module'
import { DrinkingModule } from './modules/drinking/drinking.module'
import {RedisModule} from "./repository/redis/redis.module";
import {PostgresModule} from "./repository/postgres/postgres.module";
import {AdminManagerModule} from "./modules/admin-manager/admin-manager.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				entities: [__dirname + '/**/*.entity{.ts,.js}'],
				synchronize: false,
			}),
			inject: [ConfigService],
		}),
		AdminManagerModule,
		AuthModule,
		UserModule,
		CriticModule,
		PostgresModule,
		RedisModule,
		FavoriteModule,
		ReviewModule,
		NewsModule,
		VenueModule,
		DrinkingModule,
	],
})
export class AppModule {}