import { Controller, Get } from '@nestjs/common';
import { PortsService } from './ports.service';

@Controller('ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Get()
  getPortsData() {
    return this.portsService.getPortsData();
  }
}
