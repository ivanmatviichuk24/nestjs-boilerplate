import {
  ValidationError,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

export const validationExceptionFactory = (errors: ValidationError[]) => {
  const formatError = (errors: ValidationError[]) => {
    const errMsg = errors.reduce(
      (acc, error: ValidationError) => {
        acc[error.property] = error.children.length
          ? [formatError(error.children)]
          : [...Object.values(error.constraints)]

        return acc
      },
      { statusCode: HttpStatus.BAD_REQUEST },
    )
    return errMsg
  }
  return new ValidationException(formatError(errors))
}

export class ValidationException extends BadRequestException {
  constructor(public validationErrors: Record<string, unknown>) {
    super(validationErrors)
  }
}

export class RpcValidationException extends RpcException {
  constructor(public validationErrors: Record<string, unknown>) {
    super(validationErrors)
  }
}
