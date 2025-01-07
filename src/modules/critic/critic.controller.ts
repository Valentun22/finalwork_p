import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import {CriticService} from "./service/critic.service";
import {RolesGuard} from "../admin-manager/guards/role.guard";
import {CreateCriticDto} from "./dto/req/createCritic.req.dto";
import {UpdateCriticDto} from "./dto/req/apdateCritic.req.dto";
import RequestWithUser from "../venue/dto/req/request-with-user.interface";
import {CreateReviewDto} from "../review/dto/create-review.dto";
import {RoleUser} from "../admin-manager/decorators/check.role";
import {UserRoleEnum} from "../../database/enums/roles.enum";

@ApiTags('Critic')
@Controller('critic')
export class CriticController {
    constructor(private readonly criticService: CriticService) {}

    @ApiOperation({ summary: 'Create a new critic' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Post()
    create(@Body() dto: CreateCriticDto) {
        return this.criticService.create(dto);
    }

    @ApiOperation({ summary: 'Get all critics' })
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.criticService.findAll();
    }

    @ApiOperation({ summary: 'Get critic by ID' })
    @ApiParam({ name: 'id', type: String })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.criticService.findOne(id);
    }

    @ApiOperation({ summary: 'Update critic by ID' })
    @ApiParam({ name: 'id', type: String })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCriticDto) {
        return this.criticService.update(id, dto);
    }

    @ApiOperation({ summary: 'Delete critic by ID' })
    @ApiParam({ name: 'id', type: String })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleUser(UserRoleEnum.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.criticService.remove(id);
    }

    @ApiOperation({ summary: 'Add review by critic' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleUser(UserRoleEnum.CRITIC)
    @Post(':criticId/reviews')
    addReview(
        @Req() req: RequestWithUser,
        @Body() dto: CreateReviewDto,
    ) {
        const userId = req.user.userId;
        return this.criticService.addReview(userId, dto);
    }
}