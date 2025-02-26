import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsArray,
    IsOptional, Length, IsEnum, IsUUID, ValidateNested,
} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
import {Transform, Type} from "class-transformer";
import {TransformHelper} from "../../../../common/helpers/transform.helper";
import {StatusTypeEnum} from "../../../../database/enums/status-type.enum";
import {StatisticEntity} from "../../../../database/entities/statistic.entity";

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

    @ApiProperty()
    @IsString()
    @Length(3, 50)
    @Transform(TransformHelper.trim)
    @Type(() => String)
    title: string;

    @ApiProperty()
    @IsString()
    @Length(0, 5000)
    @Transform(TransformHelper.trim)
    @Type(() => String)
    body: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(StatusTypeEnum)
    status: StatusTypeEnum;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => StatisticEntity)
    views?: StatisticEntity[];

    @ApiProperty()
    @IsOptional()
    @IsString()
    additionalInfo?: string;

    @ApiProperty()
    @IsString()
    @Length(0, 500)
    @Transform(TransformHelper.trim)
    @Type(() => String)
    description: string;

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