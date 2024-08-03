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
import { InstancesService } from './instance.service';
import {
  CreateInstanceDto,
  UpdateInstanceDto,
} from './dto';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('instances')
export class InstancesController {
  constructor(
    private instancesService: InstancesService,
  ) {}
  @Get()
  getInstances() {
    return this.instancesService.getInstances();
  }

  @Get('/:slug')
  getInstanceBySlug(@Param('slug') slug: string) {
    return this.instancesService.getInstanceBySlug(
      slug,
    );
  }

  @UseGuards(JwtGuard)
  @Post('')
  createInstance(@Body() dto: CreateInstanceDto) {
    return this.instancesService.createInstance(
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Patch('/:id')
  updateInstance(
    @Body() dto: UpdateInstanceDto,
    @Param('id') id: string,
  ) {
    return this.instancesService.updateInstance(
      dto,
      id,
    );
  }

  @UseGuards(JwtGuard)
  @Patch('/:id/uploadimage')
  @UseInterceptors(
    FileInterceptor('file')
  )
  addInstanceImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') instanceId: string
  ) {
    return this.instancesService.updateInstanceImage(instanceId, file);
  }

  @UseGuards(JwtGuard)
  @Delete('/:id')
  deleteInstance(@Param('id') id: string) {
    return this.instancesService.deleteInstance(
      id,
    );
  }
}
