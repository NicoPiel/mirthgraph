import { Controller, Get, Body, Post } from '@nestjs/common';
import { PortsService } from './ports.service';

@Controller('ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Post()
  getPortsData(@Body() body) {
    return this.portsService.getPortsData(body.data);
  }
}
