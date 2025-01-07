import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsOptional,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateVenueDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The URL of the user\'s profile picture'
    })
    @IsString()
    @IsOptional()
    image?: string;

    @ApiProperty({
        description: 'The URL of the user\'s profile picture'
    })
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiProperty({
        example: 'number',
    })
    @IsNumber()
    averageCheck: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    workingHours: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    contactInfo: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    tags: string[];

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    menu?: string[];

    @ApiProperty({
        example: 'number',
    })
    @IsNumber()
    @IsOptional()
    latitude?: number;

    @ApiProperty({
        example: 'number',
    })
    @IsNumber()
    @IsOptional()
    longitude?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    type?: string;

    @ApiProperty()
    @IsOptional()
    features?: {
        wifi: boolean;
        parking: boolean;
        liveMusic: boolean;
    };
}