import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateDrinkingDto } from './dto/create-drinking.dto';
import {DrinkingService} from "./services/drinking.service";
import { DrinkingFilters } from './interface/DrinkingFiltersInterface';

@ApiTags('Drinking')
@Controller('drinking')
export class DrinkingController {
    constructor(private readonly drinkingService: DrinkingService) {}

    @ApiOperation({ summary: 'Create a drinking request' })
    @Post()
    public async create(@Body() dto: CreateDrinkingDto) {
        return await this.drinkingService.create(dto);
    }

    @ApiOperation({ summary: 'Get drinking requests' })
    @Get()
    public async getAll(@Query() filters: DrinkingFilters) {
        return await this.drinkingService.getAll(filters);
    }
}
