import { ReferenceExpression, QueryCreator, ExpressionBuilder } from 'kysely'

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
