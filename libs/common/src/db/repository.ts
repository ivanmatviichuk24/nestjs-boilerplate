import {
  Kysely,
  InsertObject,
  ReferenceExpression,
  UpdateObject,
  ExpressionBuilder,
  ExpressionWrapper,
  SqlBool,
} from 'kysely'

export class Repository<
  DB extends object,
  TableName extends keyof DB & string,
  Filters extends object,
> {
  constructor(
    readonly table: TableName,
    readonly db: Kysely<DB>,
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
