import { ConflictException, Injectable } from '@nestjs/common';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { UserMapper } from '../../user/services/user.mapper';
import { UserResDto } from '../../user/dto/res/user.res.dto';
import { BaseAdminManagerReqDto } from '../dto/req/base-admin-manager.req.dto';
import {AccountTypeEnum} from "../../../database/enums/account-type.enum";
import {StatusTypeEnum} from "../../../database/enums/status-type.enum";
import {UserRepository} from "../../../repository/services/user.repository";
import {VenuesRepository} from "../../../repository/services/venues.repository";

@Injectable()
export class AdminManagerService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly venuesRepository: VenuesRepository,
  ) {}

  public async setNewRole(
    userData: IUserData,
    userId: string,
    dto: BaseAdminManagerReqDto,
  ): Promise<UserResDto> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.role === dto.role) {
      throw new ConflictException('User already has this role');
    }
    userEntity.role = dto.role;
    await this.userRepository.save(userEntity);
    return UserMapper.toResponseDto(userEntity);
  }

  public async setCritic(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    if (userEntity.accountType === AccountTypeEnum.CRITIC_ACCOUNT) {
      throw new ConflictException('User already has CRITIC account');
    }
    userEntity.accountType = AccountTypeEnum.CRITIC_ACCOUNT;
    await this.userRepository.save(userEntity);
  }

  public async deleteUser(userId: string): Promise<void> {
    const userEntity = await this.userRepository.findByIdOrThrow(userId);
    await this.userRepository.delete(userEntity.id);
  }

  public async blockVenue(venueId: string): Promise<void> {
    const entity =
        await this.venuesRepository.findByIdOrThrow(venueId);
    if (entity.status === StatusTypeEnum.BLOCKED) {
      throw new ConflictException('Venue is already blocked');
    }
    entity.status = StatusTypeEnum.BLOCKED;
    await this.venuesRepository.save(entity);
  }

  public async unblockVenue(venueId: string): Promise<void> {
    const entity =
        await this.venuesRepository.findByIdOrThrow(venueId);
    if (entity.status === StatusTypeEnum.ACTIVE) {
      throw new ConflictException('Venue is already active');
    }
    entity.status = StatusTypeEnum.ACTIVE;
    await this.venuesRepository.save(entity);
  }

  public async deleteVenue(venueId: string): Promise<void> {
    const entity = await this.venuesRepository.findByIdOrThrow(venueId);
    await this.venuesRepository.delete(entity.id);
  }
}
