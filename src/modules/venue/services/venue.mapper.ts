import {VenueEntity} from "../entity/venue.entity";
import {VenueResDto} from "../dto/res/venue.res.dto";
import {VenueListReqDto} from "../dto/req/venue-list.req.dto";
import {VenueListResDto} from "../dto/res/venue-list.res.dto";

export class VenueMapper {
  public static toResponseDto(
    venueEntity: VenueEntity,
  ): VenueResDto {
    return {
      venueId: venueEntity.id,
      userId: venueEntity.userId,
      name: venueEntity.name,
      image: venueEntity.image,
      body: venueEntity.body,
      title: venueEntity.title,
      photos: venueEntity.photos,
      location: venueEntity.location,
      averageCheck: venueEntity.averageCheck,
      workingHours: venueEntity.workingHours,
      contactInfo: venueEntity.contactInfo,
      tags: venueEntity.tags,
      description: venueEntity.description,
      menu: venueEntity.menu,
      latitude: venueEntity.latitude,
      longitude: venueEntity.longitude,
      likes: venueEntity.likes,
      publicationDate: venueEntity.publicationDate,
      rating: venueEntity.rating,
      type: venueEntity.type,
      statistics: venueEntity.statistics,
      owner: venueEntity.owner,
      reviews: venueEntity.reviews,
      news: venueEntity.news,
      favorites: venueEntity.favorites
    };
  }

  public static toResponseDtoById(
      venueEntity: VenueEntity,
  ): VenueResDto {
    return {
      venueId: venueEntity.id,
      userId: venueEntity.userId,
      name: venueEntity.name,
      image: venueEntity.image,
      body: venueEntity.body,
      title: venueEntity.title,
      photos: venueEntity.photos,
      location: venueEntity.location,
      averageCheck: venueEntity.averageCheck,
      workingHours: venueEntity.workingHours,
      contactInfo: venueEntity.contactInfo,
      tags: venueEntity.tags,
      description: venueEntity.description,
      menu: venueEntity.menu,
      latitude: venueEntity.latitude,
      longitude: venueEntity.longitude,
      likes: venueEntity.likes,
      publicationDate: venueEntity.publicationDate,
      rating: venueEntity.rating,
      type: venueEntity.type,
      statistics: venueEntity.statistics,
      owner: venueEntity.owner,
      reviews: venueEntity.reviews,
      news: venueEntity.news,
      favorites: venueEntity.favorites
    };
  }

  public static ToListResponseDto(
    entities: VenueEntity[],
    total: number,
    query: VenueListReqDto,
  ): VenueListResDto {
    return {
      data: entities.map(this.toResponseDtoById),
      meta: {
        limit: query.limit,
        offset: query.offset,
        total,
      },
    };
  }

  // private static mapVenueEntityToDto(venueEntity: VenueEntity) {
  //   return {
  //     venueId: venueEntity.id,
  //     name: venueEntity.name,
  //     location: venueEntity.location,
  //     averageCheck: venueEntity.averageCheck,
  //     workingHours: venueEntity.workingHours,
  //     contactInfo: venueEntity.contactInfo,
  //     image: venueEntity.image,
  //     tags: venueEntity.tags,
  //     owner: venueEntity.owner,
  //     reviews: venueEntity.reviews,
  //     news: venueEntity.news,
  //     favorites: venueEntity.favorites,
  //   };
//   }
}
