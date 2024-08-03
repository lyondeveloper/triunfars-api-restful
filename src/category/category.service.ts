import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUpdateCategoryDto } from './dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    try {
      return this.prisma.category.findMany();
    } catch (error) {
      console.log('GET_ALL_CATEGORIES ==>>', error);
      throw new ForbiddenException('Server Internal Error');
    }
  }

  async getCategoryBySlug(slug: string) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { slug },
      });

      if (!category) throw new ForbiddenException('Category not found');

      return category;
    } catch (error) {
      console.log('GET_CATEGORY_BY_SLUG ==>>', error);
      throw new ForbiddenException('Server Internal Error');
    }
  }

  async createCategory(dto: CreateUpdateCategoryDto) {
    try {
      const slug = slugify(dto.name);
      const newCategory = await this.prisma.category.create({
        data: { ...dto, slug },
      });

      if (!newCategory)
        throw new ForbiddenException('Unexpected error, category not created');

      return newCategory;
    } catch (error) {
      console.log('CREATE_CATEGORY ==>>', error);
      throw new ForbiddenException('Server Internal Error');
    }
  }

  async updateCategory(dto: CreateUpdateCategoryDto, id: string) {
    try {
      const slug = slugify(dto.name);
      const updatedCategory = await this.prisma.category.update({
        where: { id },
        data: { ...dto, slug },
      });

      if (!updatedCategory)
        throw new ForbiddenException('Unexpected error, category not updated');

      return updatedCategory;
    } catch (error) {
      console.log('UPDATE_CATEGORY ==>>', error);
      throw new ForbiddenException('Server Internal Error');
    }
  }

  async deleteCategory(id: string) {
    try {
      const deletedCategory = await this.prisma.category.delete({
        where: { id },
      });

      if (!deletedCategory)
        throw new ForbiddenException('Unexpected error, category not deleted');

      return {
        success: true,
        category: deletedCategory,
      };
    } catch (error) {
      console.log('DELETE_CATEGORY ==>>', error);
      throw new ForbiddenException('Server Internal Error');
    }
  }
}
