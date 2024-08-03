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
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/guard';
import { CreateUpdateCategoryDto } from './dto';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Get('/:slug')
  getCategoryBySlug(@Param('slug') slug: string) {
    return this.categoryService.getCategoryBySlug(slug);
  }

  @Post()
  createCategory(@Body() dto: CreateUpdateCategoryDto) {
    return this.categoryService.createCategory(dto);
  }

  @Patch('/:id')
  updateCategory(
    @Body() dto: CreateUpdateCategoryDto,
    @Param('id') id: string,
  ) {
    return this.categoryService.updateCategory(dto, id);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
