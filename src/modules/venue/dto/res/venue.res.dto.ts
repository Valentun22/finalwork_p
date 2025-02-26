import {UserEntity} from "../../../user/entity/user.entity";
import {NewsEntity} from "../../../news/entity/news.entity";
import {ReviewEntity} from "../../../review/entities/review.entity";
import {FavoriteEntity} from "../../../favorite/entities/favorite.entity";
import {StatisticEntity} from "../../../statistic/entity/statistic.entity";

export class VenueResDto {
  venueId: string;
  name: string;
  image?: string;
  body: string;
  title: string;
  photos: string[];
  location: string;
  averageCheck: number;
  workingHours: string;
  contactInfo: string;
  tags: string[];
  description?: string;
  menu?: string[];
  latitude?: number;
  longitude?: number;
  likes: number;
  publicationDate: Date;
  rating?: number;
  type?: string;
  statistics: StatisticEntity[];
  owner: UserEntity
  reviews: ReviewEntity[];
  news: NewsEntity[];
  favorites: FavoriteEntity[];
  userId: string;
}


