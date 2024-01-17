import { Exclude } from 'class-transformer'

export class UserEntity {
  id: string
  nameFirst: string
  nameLast: string
  email: string
  phone: string

  @Exclude()
  password: string

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
