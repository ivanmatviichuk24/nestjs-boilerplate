import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

@Injectable()
export class DatabaseConnection<T extends object> extends Kysely<T> {
  constructor(config: ConfigService) {
    const dialect = new PostgresDialect({
      pool: new Pool({
        database: config.getOrThrow('database.name'),
        host: config.getOrThrow('database.host'),
        user: config.getOrThrow('database.user'),
        port: config.getOrThrow('database.port'),
        password: config.getOrThrow('database.password'),
        max: 15,
      }),
    })

    super({ dialect })
  }
}
