import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiProperty()
  @IsOptional()
  //   @IsPhoneNumber()
  @IsEmail()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string
}
