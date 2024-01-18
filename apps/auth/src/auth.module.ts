import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { broker, jwt } from './config'
import { ClientProxyFactory } from '@nestjs/microservices'
import { USERS_SERVICE } from '@app/common/constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [broker, jwt],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: USERS_SERVICE,
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create(configService.get('broker')('users_queue')),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
