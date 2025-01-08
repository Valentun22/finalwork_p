import {
    Body,
    Controller,
    Delete,
    Param, Patch,
    Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './services/review.service';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a review' })
    @Post()
    public async addReview(
        @CurrentUser() userData: IUserData,
        @Body() dto: CreateReviewDto,
    ): Promise<{ message: string }> {
        return await this.reviewService.addReview(userData, dto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a review' })
    @Patch(':id')
    public async updateReview(
        @Param('id') id: string,
        @CurrentUser() userData: IUserData,
        @Body() dto: Partial<CreateReviewDto>,
    ): Promise<{ message: string }> {
        return await this.reviewService.updateReview(id, userData, dto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a review' })
    @Delete(':id')
    public async deleteReview(
        @Param('id') id: string,
        @CurrentUser() userData: IUserData,
    ): Promise<{ message: string }> {
        return await this.reviewService.deleteReview(id, userData);
    }
}
