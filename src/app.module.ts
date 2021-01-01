import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'

import { AppController } from './app.controller'
import { BotEventsService } from './bot-events/bot-events.service'
import { BotService } from './bot/bot.service'

@Module({
  imports: [DiscoveryModule],
  controllers: [AppController],
  providers: [BotService, BotEventsService],
})
export class AppModule {}
