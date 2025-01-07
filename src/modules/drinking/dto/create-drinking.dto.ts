import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateDrinkingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    venueId: string;

    @ApiProperty({
        description: 'Date',
        example: 'The date of the event',
    })
    @IsNotEmpty()
    @IsDate()
    date: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    time: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    gender: string;

    @ApiProperty({
        example: 'Number of people - number',
    })
    @IsNotEmpty()
    @IsNumber()
    numberOfPeople: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentType: string;

    @ApiProperty({
        example: 'Budget for the event - number',
    })
    @IsNotEmpty()
    @IsNumber()
    budget: number;
}
