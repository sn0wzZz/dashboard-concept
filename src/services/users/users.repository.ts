import { IUsersRepository } from '@/di/repositories/core/users.repository.interface'
import { coreRoles, coreUsers, coreUsersRoles } from '../../../migrations/schema'
import { desc, eq } from 'drizzle-orm'
import { UserWithRoles } from '../../../types'


export const UsersRepository: IUsersRepository = {

  findManyUsers: async (input, options) => {
    const promise = options.db
      .select()
      .from(coreUsers)
      .where(input.where)
      .offset(input.offset ?? 0)
      .limit(input.limit ?? 10)
      .orderBy(input.orderBy ?? desc(coreUsers.createdAt))

    return await promise
  },
  
  findManyUsersWithRoles: async (input, options) => {
    const promise = options.db
      .select({
        users: coreUsers,
        roles: coreRoles
      })
      .from(coreUsers)
      .leftJoin(coreUsersRoles, eq(coreUsers.id, coreUsersRoles.userId))
      .leftJoin(coreRoles, eq(coreUsersRoles.roleId, coreRoles.id))
      .where(input.where)
      .offset(input.offset ?? 0)
      .limit(input.limit ?? 10)
      .orderBy(input.orderBy ?? desc(coreUsers.createdAt))

    const result = await promise

    return result.map(row => ({
      users: row.users,
      roles: row.roles
    })) as UserWithRoles[]
  },
}