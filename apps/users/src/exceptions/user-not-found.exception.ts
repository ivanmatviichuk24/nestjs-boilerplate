import { RpcException } from '@nestjs/microservices'
import { HttpStatus } from '@nestjs/common'

export class UserNotFound extends RpcException {
  constructor() {
    super({
      message: 'user not found',
      statusCode: HttpStatus.NOT_FOUND,
    })
  }
}
