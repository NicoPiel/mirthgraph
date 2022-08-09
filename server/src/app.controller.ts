import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getGData() {
    return this.appService.getGraphData();
  }

  @Get('/force')
  getGDataForceRebuild() {
    return this.appService.getGraphDataForceRebuild();
  }
}
