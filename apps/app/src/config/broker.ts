import { registerAs } from '@nestjs/config'
import { Transport } from '@nestjs/microservices'

export const broker = registerAs('broker', () => {
  return (queue: string) => ({
    transport: Transport.RMQ,
    options: {
      urls: [
        `amqp://${process.env.BROKER_HOST || 'localhost'}:${
          process.env.BROKER_PORT || 5672
        }`,
      ],
      queue,
      queueOptions: {
        durable: true,
      },
    },
  })
})
