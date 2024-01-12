import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

@Injectable()
export class DatabaseConnection<T extends object> extends Kysely<T> {
  constructor(config: ConfigService) {
    const dialect = new PostgresDialect({
      pool: new Pool(config.getOrThrow('database')),
    })

    super({ dialect })
  }
}
