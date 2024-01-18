import { RpcException } from '@nestjs/microservices'
import { HttpStatus } from '@nestjs/common'

export class Unauthorized extends RpcException {
  constructor() {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'unauthorized',
    })
  }
}
