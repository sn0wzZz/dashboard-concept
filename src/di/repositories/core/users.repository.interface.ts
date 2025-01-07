import { SQL } from 'drizzle-orm'
import { ServiceOptions, UserWithRoles } from '../../../../types'
import { SelectCoreUsersSchema } from '@/lib/database/models/zod-models'

export interface IUsersRepository {
  findManyUsers(
    input: {
      where?: SQL
      orderBy?: SQL
      limit?: number
      offset?: number
    },
    options: ServiceOptions
  ): Promise<SelectCoreUsersSchema[]>
  findManyUsersWithRoles(
    input: {
      where?: SQL
      orderBy?: SQL
      limit?: number
      offset?: number
      leftJoin?: SQL
    },
    options: ServiceOptions
  ): Promise<UserWithRoles[]>
}

