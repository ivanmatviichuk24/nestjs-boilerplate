import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  name: process.env.DB_NAME || 'users',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DATABASE_PORT || 5432,
}))
