import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { Unauthorized } from '@app/common/exceptions'
import { RmqContext } from '@nestjs/microservices'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly secret: string

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.secret = configService.getOrThrow('jwt').secret
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToRpc().getContext<RmqContext>()
    const token = this.extractTokenFromHeader(ctx.getMessage())

    if (!token) {
      throw new Unauthorized()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.secret,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      context['user'] = payload
    } catch {
      throw new Unauthorized()
    }
    return true
  }

  private extractTokenFromHeader(
    message: Record<string, any>,
  ): string | undefined {
    const [type, token] =
      message?.properties?.headers?.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
