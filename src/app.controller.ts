import { Controller, Get } from '@nestjs/common'

import { BotService } from './bot/bot.service'

@Controller()
export class AppController {
  constructor(private readonly botService: BotService) {}

  @Get('readyTimestamp')
  getReadyTimestamp() {
    return {
      timestamp: this.botService.readyTimestamp,
    }
  }

  @Get('uptime')
  getUptime() {
    return {
      uptime: this.botService.uptime,
    }
  }
}
