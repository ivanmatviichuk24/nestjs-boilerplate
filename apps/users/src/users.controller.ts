import { Controller, ParseUUIDPipe, UseGuards } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { UsersService } from './users.service'
import { CreateUserDto } from '@app/common/dto'
import {
  USERS_CREATE,
  USERS_DELETE,
  USERS_GET,
  USERS_GET_LIST,
  USERS_UPDATE,
} from '@app/common/constants'
import { AuthGuard } from '@app/common/guards'

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(USERS_CREATE)
  create(@Payload() data: CreateUserDto) {
    return this.usersService.create(data)
  }

  @MessagePattern(USERS_UPDATE)
  update(@Payload() { id, ...data }: any) {
    return this.usersService.update(id, data)
  }

  @MessagePattern(USERS_DELETE)
  delete(@Payload(ParseUUIDPipe) id: string) {
    return this.usersService.delete(id)
  }

  @MessagePattern(USERS_GET)
  get(@Payload() id: string) {
    return this.usersService.get(id)
  }

  // @UseGuards(AuthGuard)
  @MessagePattern(USERS_GET_LIST)
  getList(@Payload() data: any) {
    return this.usersService.getList(data)
  }
}
