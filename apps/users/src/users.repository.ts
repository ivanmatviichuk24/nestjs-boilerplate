import { Injectable } from '@nestjs/common'
import { DB } from './db/types'
import { DatabaseConnection, filterValue, Repository } from '@app/common/db'

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

  findOne(id: string) {
    return this.db
      .selectFrom(this.table)
      .selectAll()
      .where((eb) => {
        return eb.or([
          eb('id', '=', id),
          eb('email', '=', id),
          eb('phone', '=', id),
        ])
      })
  }
}
