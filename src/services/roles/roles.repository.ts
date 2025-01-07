import { coreRoles } from '../../../migrations/schema'
import { desc } from 'drizzle-orm'
import { IRolesRepository } from '@/di/repositories/core/roles.repository.interface'

export const UsersRepository:IRolesRepository = {
  findManyRoles: async (input,options) => {
    const promise = options.db
      .select()
      .from(coreRoles)
      .where(input.where)
      .offset(input.offset ?? 0)
      .limit(input.limit ?? 10)
      .orderBy(input.orderBy ?? desc(coreRoles.createdAt))

    return await promise
  }
}
