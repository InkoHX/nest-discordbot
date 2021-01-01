import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core'
import { Client, Intents } from 'discord.js'
import { LISTEN_DISCORDJS_EVENT } from './bot.decorator'

@Injectable()
export class BotService
  extends Client
  implements
    OnModuleInit,
    OnModuleDestroy,
    OnApplicationBootstrap,
    OnApplicationShutdown {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {
    super({
      ws: {
        intents: Intents.NON_PRIVILEGED,
      },
    })
  }

  public onApplicationBootstrap() {
    this.discoveryService
      .getProviders()
      .filter(wrapper => wrapper.isDependencyTreeStatic())
      .filter(wrapper => wrapper.instance)
      .forEach(wrapper => {
        const { instance } = wrapper
        const prototype = Object.getPrototypeOf(instance)

        this.metadataScanner.scanFromPrototype(instance, prototype, name => {
          const metadata = this.reflector.get(
            LISTEN_DISCORDJS_EVENT,
            instance[name],
          )

          if (!metadata) return

          this.on(metadata, (...args) => instance[name].call(instance, ...args))
        })
      })
  }

  public async onApplicationShutdown() {
    this.removeAllListeners()
  }

  public async onModuleInit() {
    await this.login()
  }

  public async onModuleDestroy() {
    this.destroy()
  }
}
