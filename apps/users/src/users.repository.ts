import { Injectable } from '@nestjs/common'
import { DB } from './db/types'
import { DatabaseConnection, filterValue, Repository } from '@app/common/db'
import { isUUID } from 'class-validator'

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
        if (isUUID(id)) {
          return eb('id', '=', id)
        }

        return eb.or([eb('email', '=', id), eb('phone', '=', id)])
      })
  }
}
