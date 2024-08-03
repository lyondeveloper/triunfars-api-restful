import {
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating;

  @IsString()
  userId: string;
}

export class UpdateReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
