import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {VenueEntity} from "../../modules/venue/entity/venue.entity";
import {VenueListReqDto} from "../../modules/venue/dto/req/venue-list.req.dto";

@Injectable()
export class VenuesRepository extends Repository<VenueEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(VenueEntity, dataSource.manager);
  }

  public async findByIdOrThrow(id: string): Promise<VenueEntity> {
    const entity = await this.findOneBy({ id });
    if (!entity) {
      throw new UnprocessableEntityException('Venues not found');
    }
    return entity;
  }

  public async getVenueById(
      venueId: string,
  ): Promise<VenueEntity> {
    const qb = this.createQueryBuilder('venue');
    qb.leftJoinAndSelect('venue', 'venue');
    qb.where('venue.id = :venueId');
    qb.setParameter('venueId', venueId);
    return await qb.getOne();
  }
  public async getAll(
      query: VenueListReqDto,
  ): Promise<[VenueEntity[], number]> {
    const qb = this.createQueryBuilder('venue');
    qb.leftJoinAndSelect('venue', 'venue');
    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }
}
