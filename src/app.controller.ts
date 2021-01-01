import { Controller, Get } from '@nestjs/common'

import { BotService } from './bot/bot.service'

@Controller()
export class AppController {
  constructor(private readonly appService: BotService) {}

  @Get()
  getClient() {
    return this.appService
  }
}
