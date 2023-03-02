import { Test, TestingModule } from '@nestjs/testing';
import { PortsController } from './ports.controller';
import { PortsService } from './ports.service';

describe('PortsController', () => {
  let controller: PortsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortsController],
      providers: [PortsService],
    }).compile();

    controller = module.get<PortsController>(PortsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
