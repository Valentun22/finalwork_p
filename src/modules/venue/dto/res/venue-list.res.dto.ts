import {VenueResDto} from "./venue.res.dto";

export class VenueListResDto {
  data: VenueResDto[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}
