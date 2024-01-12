import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { ConfigModule } from '@nestjs/config'
import database from './config/database'
import { UsersRepository } from './users.repository'
import { DatabaseModule, DatabaseConnection } from '@app/common/db'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [database],
    }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, DatabaseConnection],
})
export class UsersModule {}
