import { Controller, UseFilters } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { AuthService } from './auth.service'
import { AUTH_SIGN_IN, AUTH_SIGN_UP } from '@app/common/constants'
import { CreateUserDto, SignInDto } from '@app/common/dto'
import { ExceptionFilter } from '@app/common/exceptions'

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseFilters(new ExceptionFilter())
  @MessagePattern(AUTH_SIGN_IN)
  signIn(@Payload() { username, password }: SignInDto) {
    return this.authService.signIn(username, password)
  }

  @UseFilters(new ExceptionFilter())
  @MessagePattern(AUTH_SIGN_UP)
  signUp(@Payload() data: CreateUserDto) {
    return this.authService.signUp(data)
  }
}
