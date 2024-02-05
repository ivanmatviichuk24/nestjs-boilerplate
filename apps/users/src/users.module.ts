import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { jwt, database } from './config'
import { UsersRepository } from './users.repository'
import { DatabaseModule, DatabaseConnection } from '@app/common/db'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [database, jwt],
    }),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('jwt'),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DatabaseConnection],
})
export class UsersModule {}
