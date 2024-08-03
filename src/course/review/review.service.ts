import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async checkCourse(courseId: string) {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) throw new ForbiddenException('Course does not exist');

      return course;
    } catch (error) {
      console.log('COURSE_CHECK_SECTION ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }

  async getAll(courseId: string) {
    try {
      await this.checkCourse(courseId);

      return this.prisma.review.findMany({
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              createdAt: true,
            },
          },
        },
      });
    } catch (error) {
      console.log('GET_ALL_REVIEWS ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }

  async getById(courseId: string, reviewId: string) {
    try {
      await this.checkCourse(courseId);
      const review = this.prisma.review.findUnique({
        where: { id: reviewId },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              createdAt: true,
            },
          },
        },
      });
      if (!review) throw new ForbiddenException('Review not found');

      return review;
    } catch (error) {
      console.log('GET_REVIEW_BY_ID_ERROR ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }

  // TODO: avoid letting user do more than 2 reviews
  async createReview(dto: CreateReviewDto, courseId: string) {
    try {
      await this.checkCourse(courseId);
      const newReview = await this.prisma.review.create({
        data: { ...dto, courseId },
      });
      if (!newReview)
        throw new ForbiddenException('Unexpected error, review not created');

      return newReview;
    } catch (error) {
      console.log('CREATE_REVIEW ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }

  async updateReview(dto: UpdateReviewDto, courseId: string, reviewId: string) {
    try {
      await this.checkCourse(courseId);
      const updatedReview = await this.prisma.review.update({
        where: { id: reviewId, courseId },
        data: { ...dto },
      });

      if (!updatedReview)
        throw new ForbiddenException('Unexpected error, Review not updated');

      return updatedReview;
    } catch (error) {
      console.log('UPDATE_REVIEW ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }

  async deleteReview(courseId: string, reviewId: string) {
    try {
      await this.checkCourse(courseId);
      const deletedReview = await this.prisma.review.delete({
        where: { id: reviewId },
      });

      if (!deletedReview)
        throw new ForbiddenException('Unexpected error, review not updated');

      return {
        success: true,
        deletedData: deletedReview,
      };
    } catch (error) {
      console.log('DELETE_REVIEW ==>>', error);
      throw new ForbiddenException('Server internal error');
    }
  }
}
