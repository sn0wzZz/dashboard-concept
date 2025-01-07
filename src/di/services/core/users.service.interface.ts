import { SelectCoreUsersSchema } from '@/lib/database/models/zod-models'
import { SQL } from 'drizzle-orm'
import { ServiceOptions, UserWithRoles } from '../../../../types'

export interface IUsersService {
  getUsers(
    params?: {
      filters?: SQL
      sort?: SQL
      page?: number
      pageSize?: number
    },
    options?: ServiceOptions
  ): Promise<SelectCoreUsersSchema[]>
  getUsersWithRoles(
    params?: {
      filters?: SQL
      sort?: SQL
      page?: number
      pageSize?: number
    },
    options?: ServiceOptions
  ): Promise<UserWithRoles[]>
}