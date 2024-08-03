import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtGuard } from 'src/auth/guard';
import {
  CreateCourseDto,
  UpdateCourseDto,
} from './dto';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller()
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) {}

  @Get()
  getAll() {
    return this.courseService.getAll();
  }

  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.courseService.getBySlug(slug);
  }

  @UseGuards(RolesGuard)
  @hasRoles(Role.ADMIN, Role.INSTRUCTOR)
  @Post()
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  // @UseGuards(RolesGuard)
  // @hasRoles(Role.ADMIN, Role.INSTRUCTOR)
  @Patch(':id')
  updateCourse(
    @Body() dto: UpdateCourseDto,
    @Param('id') id: string,
  ) {
    return this.courseService.updateCourse(
      dto,
      id,
    );
  }

  // @UseGuards(RolesGuard)
  // @hasRoles(Role.ADMIN, Role.INSTRUCTOR)
  @Patch(':courseSlug/uploadimage')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  addSectionImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.courseService.updateCourseImage(
      courseSlug,
      file,
    );
  }

  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }
}
