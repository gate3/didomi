import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // TODO - create a function to check for local infra, 3rd party infra etc. and report back with ok if all is well or another error code if not.
  @ApiOperation({
    summary:
      'Health check endpoint to return a static text and 200 response after checking api is functional.',
  })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
