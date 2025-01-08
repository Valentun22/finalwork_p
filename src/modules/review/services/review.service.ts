import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserData } from "../../auth/interfaces/user-data.interface";
import { CreateReviewDto } from "../dto/create-review.dto";
import { ReviewEntity } from "../entities/review.entity";

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(ReviewEntity)
        private readonly reviewRepository: Repository<ReviewEntity>,
    ) {}

    public async addReview(
        userData: IUserData,
        dto: CreateReviewDto,
    ): Promise<{ message: string }> {
        const review = this.reviewRepository.create({
            ...dto,
            userId: userData.userId,
        });
        await this.reviewRepository.save(review);
        return { message: 'Review added successfully' };
    }

    public async deleteReview(
        reviewId: string,
        userData: IUserData,
    ): Promise<{ message: string }> {
        const review = await this.reviewRepository.findOne({
            where: { id: reviewId, userId: userData.userId },
        });
        if (!review) {
            throw new NotFoundException('Review not found or you are not authorized to delete it');
        }
        await this.reviewRepository.delete(reviewId);
        return { message: 'Review deleted successfully' };
    }

    public async updateReview(
        reviewId: string,
        userData: IUserData,
        dto: Partial<CreateReviewDto>,
    ): Promise<{ message: string }> {
        const review = await this.reviewRepository.findOne({
            where: { id: reviewId, userId: userData.userId },
        });
        if (!review) {
            throw new NotFoundException('Review not found or you are not authorized to update it');
        }
        Object.assign(review, dto);
        await this.reviewRepository.save(review);
        return { message: 'Review updated successfully' };
    }
}
