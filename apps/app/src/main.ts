import { NestFactory, Reflector } from '@nestjs/core'
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { validationExceptionFactory } from '@app/common/exceptions'
import { AppModule } from './app.module'
import { AllExceptionFilter } from './exceptions'
import { HttpAdapterHost } from '@nestjs/core'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Nestjs boilerplate')
    .setDescription('API description')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: validationExceptionFactory,
    }),
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  const httpAdapter = app.get(HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter))

  await app.listen(4001)
}
bootstrap()
