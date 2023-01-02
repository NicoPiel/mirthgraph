import { Module } from '@nestjs/common';
import { PortsService } from './ports.service';
import { PortsController } from './ports.controller';

@Module({
  controllers: [PortsController],
  providers: [PortsService],
})
export class PortsModule {}
