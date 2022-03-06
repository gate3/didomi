import { Test, TestingModule } from '@nestjs/testing';
import { ConsentController } from '../../../modules/consent/consent.controller';
import { ConsentService } from '../../../modules/consent/consent.service';
import { ConsentTypes } from '../../../modules/consent/constants';
import {
  ConsentEventResponse,
  CreateConsentEventDto,
} from '../../../modules/consent/dto/consent.dto';
import { MockConsentEventsEntity, MockConsentService } from './mocks';

describe('ConsentController', () => {
  let controller: ConsentController;
  let consentService: ConsentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsentController],
      providers: [
        {
          provide: ConsentService,
          useClass: MockConsentService,
        },
      ],
    }).compile();

    controller = module.get<ConsentController>(ConsentController);
    consentService = module.get<ConsentService>(ConsentService);
  });

  describe('@Post - Create', () => {
    it('should add data to createConsentDTO and pass it to consentService.createEvent', () => {
      const mockCreateConsentResponse = new ConsentEventResponse({
        ...MockConsentEventsEntity(),
      });

      const consentEventsServiceSpy = jest
        .spyOn<ConsentService, 'create'>(consentService, 'create')
        .mockImplementation(() => Promise.resolve(mockCreateConsentResponse));

      const mockConsentEventsData: CreateConsentEventDto = {
        email: 'test@email.com',
        enabled: true,
        id: ConsentTypes.ALL_NOTIFICATIONS,
      };

      controller.createEvent(mockConsentEventsData);

      expect(consentEventsServiceSpy).toHaveBeenCalledTimes(1);
      expect(consentEventsServiceSpy).toHaveBeenCalledWith(
        mockConsentEventsData,
      );
    });
  });
});
