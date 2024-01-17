import {
  Controller,
  Get,
  Inject,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserDto, UserEntity, UserFiltersDto } from '@app/common/dto'
import { constants } from './config'
import { lastValueFrom } from 'rxjs'
import {
  USERS_CREATE,
  USERS_DELETE,
  USERS_GET,
  USERS_GET_LIST,
  USERS_UPDATE,
} from '@app/common/constants'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(constants.USERS_SERVICE) private usersClient: ClientProxy,
  ) {}

  @Get()
  async getList(@Query() filters: UserFiltersDto) {
    const users = await lastValueFrom(
      this.usersClient.send(USERS_GET_LIST, filters),
    )

    return users.map((user) => new UserEntity(user as any))
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(
      await lastValueFrom(this.usersClient.send(USERS_GET, id)),
    )
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return new UserEntity(
      await lastValueFrom(this.usersClient.send(USERS_CREATE, data)),
    )
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(
      await lastValueFrom(this.usersClient.send(USERS_UPDATE, { id })),
    )
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(
      await lastValueFrom(this.usersClient.send(USERS_DELETE, id)),
    )
  }
}
