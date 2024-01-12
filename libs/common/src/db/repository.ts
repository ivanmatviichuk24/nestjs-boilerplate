import {
  Kysely,
  InsertObject,
  ReferenceExpression,
  UpdateObject,
  QueryCreator,
  ExpressionBuilder,
  ExpressionWrapper,
  SqlBool,
} from 'kysely'

export const filterValue = <
  DB extends object,
  TableName extends keyof DB & string,
  T extends ExpressionBuilder<DB, TableName>,
>(
  key: string,
  value: any,
) => {
  return (eb: T) => {
    if (Array.isArray(value) || value instanceof QueryCreator) {
      return eb(key as ReferenceExpression<DB, TableName>, 'in', value)
    }

    return eb(key as ReferenceExpression<DB, TableName>, '=', value)
  }
}

export class Repository<
  DB extends object,
  TableName extends keyof DB & string,
  Filters extends object,
> {
  constructor(
    private readonly table: TableName,
    private readonly db: Kysely<DB>,
    private readonly filters: {
      [x: string]: (
        value: any,
      ) => (
        eb: ExpressionBuilder<DB, TableName>,
      ) => ExpressionWrapper<DB, TableName, SqlBool>
    },
  ) {}

  findOne(id: string) {
    return this.db
      .selectFrom(this.table)
      .selectAll()
      .where('id' as ReferenceExpression<DB, any>, '=', id)
  }

  findMany(filters: Filters) {
    return this.db
      .selectFrom(this.table)
      .selectAll()
      .where(this.filter(filters))
  }

  create(data: InsertObject<DB, TableName>) {
    return this.db.insertInto(this.table).values(data).returningAll()
  }

  delete(id: string) {
    return this.db
      .deleteFrom(this.table)
      .where('id' as ReferenceExpression<DB, any>, '=', id)
      .returningAll()
  }

  deleteMany(filters: Filters) {
    return this.db
      .deleteFrom(this.table)
      .where(this.filter(filters))
      .returningAll()
  }

  update(id: string, data: UpdateObject<DB, TableName>) {
    return this.db
      .updateTable(this.table)
      .where('id' as ReferenceExpression<DB, any>, '=', id)
      .set(data as UpdateObject<DB, any>)
      .returningAll()
  }

  updateMany(filters: Filters, data: UpdateObject<DB, TableName>) {
    this.db
      .updateTable(this.table)
      .set(data as UpdateObject<DB, any>)
      .where(this.filter(filters))
      .returningAll()
  }

  filter(filters: Filters) {
    return (eb: ExpressionBuilder<DB, any>) => {
      return eb.and(
        Object.entries(filters)
          .map(([key, value]) => {
            return this.filters[key]?.(value)(eb)
          })
          .filter(Boolean),
      )
    }
  }
}
