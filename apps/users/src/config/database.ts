import { registerAs } from '@nestjs/config'

export const database = registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'users',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DATABASE_PORT || 5432,
  max: 15,
}))
