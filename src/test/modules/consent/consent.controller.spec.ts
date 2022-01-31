import { Test, TestingModule } from '@nestjs/testing';
import { ConsentController } from '../../../modules/consent/consent.controller';
import { ConsentService } from '../../../modules/consent/consent.service';

describe('ConsentController', () => {
  let controller: ConsentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsentController],
      providers: [ConsentService],
    }).compile();

    controller = module.get<ConsentController>(ConsentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
