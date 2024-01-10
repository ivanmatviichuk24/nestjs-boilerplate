import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://host.docker.internal:5672'],
        queue: 'users_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  )
  await app.listen()
}
bootstrap()
