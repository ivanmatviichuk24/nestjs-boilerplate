import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsStrongPassword,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameFirst: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameLast: string

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phone: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string
}
