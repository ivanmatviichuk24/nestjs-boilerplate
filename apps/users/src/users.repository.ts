import { Injectable } from '@nestjs/common'
import { Repository, filterValue } from '@app/common'
import { DB } from './db/types'
import { DatabaseConnection } from '@app/common/db'

@Injectable()
export class UsersRepository extends Repository<
  DB,
  'users',
  { id?: string | string[] | null }
> {
  constructor(databaseConnection: DatabaseConnection<DB>) {
    super('users', databaseConnection, {
      id: (id: string | string[] | null) => filterValue('id', id),
    })
  }
}
