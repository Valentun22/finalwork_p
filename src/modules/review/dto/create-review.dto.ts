import { IsNotEmpty, IsInt, Min, Max } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateReviewDto {
    @ApiProperty()
    @IsNotEmpty()
    venueId: string;

    @ApiProperty({
        example: '1-5',
    })
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @ApiProperty()
    @IsNotEmpty()
    comment: string;
}
