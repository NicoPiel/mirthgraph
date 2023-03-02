import { Test, TestingModule } from '@nestjs/testing';
import { GraphsController } from './graphs.controller';
import { GraphsService } from './graphs.service';

describe('GraphsController', () => {
  let controller: GraphsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GraphsController],
      providers: [GraphsService],
    }).compile();

    controller = module.get<GraphsController>(GraphsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
