import { Controller, Get } from '@nestjs/common';
import { GraphsService } from './graphs.service';

@Controller('graphs')
export class GraphsController {
  constructor(private readonly graphsService: GraphsService) {}

  @Get()
  getGData() {
    return this.graphsService.getGraphData();
  }

  @Get('/force')
  getGDataForceRebuild() {
    return this.graphsService.getGraphDataForceRebuild();
  }
}
