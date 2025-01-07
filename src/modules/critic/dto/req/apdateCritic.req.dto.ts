import { IsOptional, IsString, IsEmail } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCriticDto {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    bio?: string;
}