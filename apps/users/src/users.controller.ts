import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'
import { UsersService } from './users.service'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('getHello')
  getHello(): string {
    return this.usersService.getHello()
  }
}
