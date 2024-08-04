import { LessonType } from '@prisma/client';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUpdateLessonDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  type: LessonType;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsOptional()
  coverImage: string;
}
