import { NestFactory } from '@nestjs/core'
import { UsersModule } from './users.module'
import { Transport, MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.MQTT,
      options: {
        url: 'mqtt://localhost:1883',
      },
    },
  )
  await app.listen()
}
bootstrap()
