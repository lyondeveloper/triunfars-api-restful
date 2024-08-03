import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
