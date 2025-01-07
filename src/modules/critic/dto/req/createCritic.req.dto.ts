import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCriticDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    image?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    bio?: string;
}