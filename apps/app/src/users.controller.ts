import {
  Controller,
  Get,
  Inject,
  Delete,
  Put,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  Headers,
} from '@nestjs/common'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices'
import { UserEntity, UserFiltersDto } from '@app/common/dto'
import { lastValueFrom } from 'rxjs'
import {
  USERS_SERVICE,
  USERS_DELETE,
  USERS_GET,
  USERS_GET_LIST,
  USERS_UPDATE,
} from '@app/common/constants'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(@Inject(USERS_SERVICE) private usersClient: ClientProxy) {}

  @Get()
  // @ApiBearerAuth()
  async getList(@Query() filters: UserFiltersDto, @Headers() headers) {
    const message = new RmqRecordBuilder(filters)
      .setOptions({
        headers,
      })
      .build()

    const users = await lastValueFrom(
      this.usersClient.send(USERS_GET_LIST, message),
    )

    return users.map((user) => new UserEntity(user as any))
  }

  @Get(':id')
  async get(@Param('id', ParseUUIDPipe) id: string) {
    return new UserEntity(
      await lastValueFrom(this.usersClient.send(USERS_GET, id)),
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
