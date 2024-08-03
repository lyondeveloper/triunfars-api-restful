import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ReviewService } from './review.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

UseGuards(JwtGuard);
@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  getAll(@Param('courseId') courseId: string) {
    return this.reviewService.getAll(courseId);
  }

  @Get(':reviewId')
  getById(
    @Param('courseId') courseId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.getById(courseId, reviewId);
  }
  @Post()
  createReview(
    @Body() dto: CreateReviewDto,
    @Param('courseId') courseId: string,
  ) {
    return this.reviewService.createReview(dto, courseId);
  }
  @Patch(':reviewId')
  updateReview(
    @Body() dto: UpdateReviewDto,
    @Param('courseId') courseId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.updateReview(dto, courseId, reviewId);
  }

  @Delete(':reviewId')
  deleteReview(
    @Param('courseId') courseId: string,
    @Param('reviewId') reviewId: string,
  ) {
    return this.reviewService.deleteReview(courseId, reviewId);
  }
}
