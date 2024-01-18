import { Controller, Inject, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ClientProxy } from '@nestjs/microservices'
import { CreateUserDto, SignInDto } from '@app/common/dto'
import { lastValueFrom } from 'rxjs'
import { AUTH_SERVICE, AUTH_SIGN_UP, AUTH_SIGN_IN } from '@app/common/constants'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: ClientProxy) {}

  @Post('/sign-in')
  async signIn(@Body() data: SignInDto) {
    return await lastValueFrom(this.authService.send(AUTH_SIGN_IN, data))
  }

  @Post('/sign-up')
  async signUp(@Body() data: CreateUserDto) {
    return await lastValueFrom(this.authService.send(AUTH_SIGN_UP, data))
  }
}
