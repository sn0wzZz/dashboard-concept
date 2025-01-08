import { IWorkspacesRepository } from '@/di/repositories/core/workspaces.repository.interface'
import { count, desc, eq } from 'drizzle-orm'
import { coreWorkspaces, coreWorkspacesUsers } from '../../../migrations/schema'

export const WorkspacesRepository: IWorkspacesRepository = {
  findManyWorkspacesWithUserCount: async (input, options) => {
    const promise = options.db
      .select({
        workspace: coreWorkspaces,
        userCount: count(coreWorkspacesUsers.userId).as('userCount'),
      })
      .from(coreWorkspaces)
      .leftJoin(
        coreWorkspacesUsers,
        eq(coreWorkspacesUsers.workspaceId, coreWorkspaces.id)
      )
      .groupBy(coreWorkspaces.id)
      .where(input.where)
      .offset(input.offset ?? 0)
      .limit(input.limit ?? 10)
      .orderBy(input.orderBy ?? desc(coreWorkspaces.createdAt))

    return await promise
  },
}
