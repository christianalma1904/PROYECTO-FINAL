import { Test, TestingModule } from '@nestjs/testing';
import { DietasService } from './dietas.service';

describe('DietasService', () => {
  let service: DietasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DietasService],
    }).compile();

    service = module.get<DietasService>(DietasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
