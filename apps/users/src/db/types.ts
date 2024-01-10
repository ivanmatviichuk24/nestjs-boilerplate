import type { ColumnType } from 'kysely'
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type User = {
  id: Generated<string>
  name_first: Generated<string>
  name_last: Generated<string>
  password: string | null
  created: Generated<Timestamp>
  updated: Generated<Timestamp>
}
export type DB = {
  users: User
}
