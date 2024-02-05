import { registerAs } from '@nestjs/config'

export const jwt = registerAs('jwt', () => {
  return {
    secret: process.env.SECRET_KEY,
    signOptions: {
      expiresIn: 36000,
    },
  }
})
