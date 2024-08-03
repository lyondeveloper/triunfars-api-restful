import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller()
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
  ) {}
  @Get()
  getAll(
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.sectionService.getAll(courseSlug);
  }

  @Get(':sectionSlug')
  getBySlug(
    @Param('courseSlug') courseSlug: string,
    @Param('sectionSlug') sectionSlug: string,
  ) {
    return this.sectionService.getBySlug(
      courseSlug,
      sectionSlug,
    );
  }

  @Patch(':sectionSlug/uploadimage')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  addSectionImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('sectionSlug') sectionSlug: string,
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.sectionService.addSectionImage(
      sectionSlug,
      courseSlug,
      file,
    );
  }

  @Post()
  createSection(
    @Body() dto: CreateSectionDto,
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.sectionService.createSection(
      courseSlug,
      dto,
    );
  }

  @Patch(':sectionSlug')
  updateSection(
    @Body() dto: CreateSectionDto,
    @Param('sectionSlug') sectionSlug: string,
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.sectionService.updateSection(
      courseSlug,
      sectionSlug,
      dto,
    );
  }

  @Delete(':sectionSlug')
  deleteSection(
    @Param('sectionSlug') sectionSlug: string,
    @Param('courseSlug') courseSlug: string,
  ) {
    return this.sectionService.deleteSection(
      courseSlug,
      sectionSlug,
    );
  }
}
