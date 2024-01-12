import { Module, DynamicModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DatabaseConnection } from './database.connection'

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static register(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [DatabaseConnection],
      exports: [DatabaseConnection],
    }
  }
}
