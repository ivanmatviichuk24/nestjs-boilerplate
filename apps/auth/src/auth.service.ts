import { Injectable, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { JwtService } from '@nestjs/jwt'
import { USERS_SERVICE, USERS_GET, USERS_CREATE } from '@app/common/constants'
import { lastValueFrom } from 'rxjs'
import { compare, hash, genSalt } from 'bcryptjs'
import { CreateUserDto } from '@app/common/dto'
import { catchError } from 'rxjs'
import { InvalidCredentials } from './exceptions'

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async generateToken(payload: { id: string }) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async signIn(id: string, password: string) {
    const user = await lastValueFrom(
      this.usersClient.send(USERS_GET, id).pipe(
        catchError(() => {
          throw new InvalidCredentials()
        }),
      ),
    )

    if (!(await compare(password, user.password))) {
      throw new InvalidCredentials()
    }

    return this.generateToken({ id: user.id })
  }

  async signUp({ password, ...data }: CreateUserDto) {
    const user = await lastValueFrom(
      this.usersClient.send(USERS_CREATE, {
        ...data,
        password: await hash(password, await genSalt(10)),
      }),
    )

    return this.generateToken({ id: user.id })
  }
}
