import { RpcException } from '@nestjs/microservices'
import { HttpStatus } from '@nestjs/common'

export class PhoneAlreadyExists extends RpcException {
  constructor() {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      phone: ['user with such phone number already exists'],
    })
  }
}
