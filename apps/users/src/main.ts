import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(UsersModule)

  const configService = app.get(ConfigService)

  const brokerHost = configService.get('BROKER_HOST')

  const brokerPort = configService.get('BROKER_PORT')

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${brokerHost}:${brokerPort}`],
      queue: 'users_queue',
      queueOptions: {
        durable: true,
      },
    },
  })

  await app.startAllMicroservices()
}
bootstrap()
