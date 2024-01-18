import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersController } from './users.controller'
import { AuthController } from './auth.controller'
import { ClientProxyFactory } from '@nestjs/microservices'
import { broker } from './config'
import { USERS_SERVICE, AUTH_SERVICE } from '@app/common/constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [broker],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: USERS_SERVICE,
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.get('broker')('users_queue')),
      inject: [ConfigService],
    },
    {
      provide: AUTH_SERVICE,
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.get('broker')('auth_queue')),
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
