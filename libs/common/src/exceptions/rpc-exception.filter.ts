import { Catch, ArgumentsHost } from '@nestjs/common'
import { throwError } from 'rxjs'
import { BaseRpcExceptionFilter } from '@nestjs/microservices'

@Catch()
export class ExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return throwError(() => exception?.getError?.() || exception)
  }
}
