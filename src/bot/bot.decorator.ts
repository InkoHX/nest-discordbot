import { SetMetadata } from '@nestjs/common'
import { ClientEvents } from 'discord.js'

export const LISTEN_DISCORDJS_EVENT = 'LISTEN_DISCORDJS_EVENT'

export const OnEvent = (name: keyof ClientEvents) =>
  SetMetadata(LISTEN_DISCORDJS_EVENT, name)
