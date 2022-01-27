import { Controller, Post, Body } from '@nestjs/common';
import { ConsentService } from './consent.service';
import { CreateConsentEventDto } from './dto/consent.dto';

@Controller('consent')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Post('/events')
  createEvent(@Body() createConsentDto: CreateConsentEventDto) {
    return this.consentService.create(createConsentDto);
  }
}
