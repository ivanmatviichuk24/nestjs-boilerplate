import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import {
  EmailAlreadyExists,
  UserNotFound,
  PhoneAlreadyExists,
} from './exceptions'
import { CreateUserDto } from '@app/common/dto'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async checkEmailExistance(email: string) {
    const user = await this.usersRepository.findOne(email).executeTakeFirst()

    if (user) {
      throw new EmailAlreadyExists()
    }
  }

  async checkPhoneExistance(phone: string) {
    const user = await this.usersRepository.findOne(phone).executeTakeFirst()

    if (user) {
      throw new PhoneAlreadyExists()
    }
  }

  async create(data: CreateUserDto) {
    data.email && (await this.checkEmailExistance(data.email))
    data.phone && (await this.checkPhoneExistance(data.phone))

    return await this.usersRepository.create(data).executeTakeFirst()
  }

  async update(id: string, data: Parameters<UsersRepository['update']>[1]) {
    return await this.usersRepository.update(id, data).executeTakeFirstOrThrow()
  }

  async delete(id: string) {
    return await this.usersRepository.delete(id).executeTakeFirstOrThrow()
  }

  async get(id: string) {
    return await this.usersRepository
      .findOne(id)
      .executeTakeFirstOrThrow(() => new UserNotFound())
  }

  async getList(data: Parameters<UsersRepository['findMany']>[0]) {
    return await this.usersRepository.findMany(data).execute()
  }
}
