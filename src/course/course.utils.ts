import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseUtilsService {
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
}
