import { IsUUID, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserFiltersDto {
  @ApiProperty({ required: false, isArray: true, type: 'string' })
  @IsOptional()
  @IsUUID(4, { each: true })
  id?: string | string[]

  @ApiProperty({ required: false, isArray: true, type: 'string' })
  @IsOptional()
  @IsEmail({}, { each: true })
  email?: string | string[]

  @ApiProperty({ required: false, isArray: true, type: 'string' })
  @IsOptional()
  @IsPhoneNumber(undefined, { each: true })
  phone?: string | string[]
}
