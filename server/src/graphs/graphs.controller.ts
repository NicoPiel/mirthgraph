import { Body, Controller, Get, Post } from '@nestjs/common';
import { GraphsService } from './graphs.service';

@Controller('graphs')
export class GraphsController {
  constructor(private readonly graphsService: GraphsService) {}

  @Post()
  getGData(@Body() body) {
    return this.graphsService.getGraphData(body.data);
  }

  @Post('/force')
  getGDataForceRebuild(@Body() body) {
    return this.graphsService.getGraphDataForceRebuild(body.data);
  }
}
