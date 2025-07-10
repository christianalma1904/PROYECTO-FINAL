import { Test, TestingModule } from '@nestjs/testing';
import { DietasController } from './dietas.controller';

describe('DietasController', () => {
  let controller: DietasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietasController],
    }).compile();

    controller = module.get<DietasController>(DietasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
