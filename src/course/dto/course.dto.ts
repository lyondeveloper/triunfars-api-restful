// import { LocalFile } from '@prisma/client';
import { IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  // imageUrl: LocalFile;

  @IsString()
  instructorId: string;

  @IsString()
  instanceId: string;

  @IsString()
  categoryId: string;

  @IsString()
  averageRating: string;

  @IsString()
  price: string;
}

export interface UpdateCourseDto {
  title: string;
  description: string;
  // imageUrl: LocalFile;
  instructorId: string;
  instanceId: string;
  categoryId: string;
  averageRating: string;
  price: string;
}
