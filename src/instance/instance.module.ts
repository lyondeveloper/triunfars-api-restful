import { Module } from '@nestjs/common';
import { InstancesController } from './instance.controller';
import { InstancesService } from './instance.service';

@Module({
  providers: [InstancesService],
  controllers: [InstancesController],
})
export class InstancesModule {}
