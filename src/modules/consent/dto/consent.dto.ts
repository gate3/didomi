import { ConsentTypes } from '../constants';

export class CreateConsentEventDto {
  id: ConsentTypes;
  email: string;
  enabled: boolean;
}
