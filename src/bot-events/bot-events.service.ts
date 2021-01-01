import { Injectable, Logger } from '@nestjs/common'
import { Message } from 'discord.js'
import { BotService } from 'src/bot/bot.service'
import { OnEvent } from 'src/bot/bot.decorator'

@Injectable()
export class BotEventsService {
  public readonly logger = new Logger('BotEvents')

  public constructor(private readonly botService: BotService) {}

  @OnEvent('ready')
  public onReady() {
    this.logger.log(`Logged in as ${this.botService.user?.tag}!`)
  }

  @OnEvent('message')
  public async onMessage(message: Message) {
    console.log(message.author)
    if (message.author.bot) return

    await message.reply(`Hey ${message.author.tag}`)
  }
}
