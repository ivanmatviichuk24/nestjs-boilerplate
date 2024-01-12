import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { AppService } from './app.service'

@Controller('users')
export class UsersController {
  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
  ) {}

  @Get()
  getHello() {
    return this.usersClient.send('getHello', {})
  }
}
