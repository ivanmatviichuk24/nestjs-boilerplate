import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersController } from './users.controller'
import { ClientProxyFactory } from '@nestjs/microservices'
import { broker, constants } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [broker],
    }),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: constants.USERS_SERVICE,
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.get('broker')('users_queue')),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
