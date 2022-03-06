import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConsentService } from './consent.service';
import { ConsentEventResponse, CreateConsentEventDto } from './dto/consent.dto';

@ApiTags('Consent')
@Controller('consent')
export class ConsentController {
  constructor(private readonly consentService: ConsentService) {}

  @Post('/events')
  @ApiOperation({
    summary:
      'Add a new event to the user preference and manage enabling it as default.',
  })
  createEvent(
    @Body() body: CreateConsentEventDto,
  ): Promise<ConsentEventResponse> {
    return this.consentService.create(body);
  }
}
