import { Module } from '@nestjs/common';
import { AdminManagerController } from './admin-manager.controller';
import { AdminManagerService } from './services/admin-manager.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "../user/user.module";
import {VenuesRepository} from "../../repository/services/venues.repository";

@Module({
  imports: [TypeOrmModule.forFeature([VenuesRepository]),
    UserModule,],
  controllers: [AdminManagerController],
  providers: [AdminManagerService],
  exports: [AdminManagerService],
})
export class AdminManagerModule {}
