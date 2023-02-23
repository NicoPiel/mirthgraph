import { Test, TestingModule } from '@nestjs/testing';
import { GraphsService } from './graphs.service';

describe('GraphsService', () => {
  let service: GraphsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphsService],
    }).compile();

    service = module.get<GraphsService>(GraphsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
