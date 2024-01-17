import { RpcException } from '@nestjs/microservices'
import { HttpStatus } from '@nestjs/common'

export class EmailAlreadyExists extends RpcException {
  constructor() {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      email: ['email already exists'],
    })
  }
}
