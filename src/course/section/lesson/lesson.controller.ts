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
import { LessonService } from './lesson.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateUpdateLessonDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

UseGuards(JwtGuard);
@Controller()
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
  ) {}

  @Get()
  getAll(@Param('sectionSlug') sectionSlug: string) {
    return this.lessonService.getAll(sectionSlug);
  }

  @Get(':lessonId')
  getById(
    @Param('lessonId') lessonId: string,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return this.lessonService.getById(
      sectionSlug,
      lessonId,
    );
  }

  @Post()
  createLesson(
    @Body() dto: CreateUpdateLessonDto,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return this.lessonService.createLesson(
      sectionSlug,
      dto,
    );
  }

  @Patch(':lessonId')
  updateLesson(
    @Body() dto: CreateUpdateLessonDto,
    @Param('lessonId') lessonId: string,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return this.lessonService.updateLesson(
      dto,
      lessonId,
      sectionSlug,
    );
  }

  @Patch(':lessonId/uploadimage')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  addSectionImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('sectionSlug') sectionSlug: string,
    @Param('lessonId') lessonId: string,
  ) {
    return this.lessonService.addLessonImage(
      file,
      lessonId,
      sectionSlug,
    );
  }

  @Delete(':lessonId')
  deleteLesson(
    @Param('lessonId') lessonId: string,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return this.lessonService.deleteLesson(
      lessonId,
      sectionSlug,
    );
  }
}
