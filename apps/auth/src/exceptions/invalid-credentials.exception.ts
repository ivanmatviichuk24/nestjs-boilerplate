import { RpcException } from '@nestjs/microservices'
import { HttpStatus } from '@nestjs/common'

export class InvalidCredentials extends RpcException {
  constructor() {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid credentials',
    })
  }
}
