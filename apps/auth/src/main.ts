import { NestFactory } from '@nestjs/core'
import { AuthModule } from './auth.module'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { validationExceptionFactory } from '@app/common/exceptions'

async function bootstrap() {
  const app = await NestFactory.create(AuthModule)

  const configService = app.get(ConfigService)

  const brokerHost = configService.get('BROKER_HOST')

  const brokerPort = configService.get('BROKER_PORT')

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${brokerHost}:${brokerPort}`],
      queue: 'auth_queue',
      queueOptions: {
        durable: true,
      },
    },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationExceptionFactory,
    }),
  )

  await app.startAllMicroservices()
}
bootstrap()
