import { IWorkspacesRepository } from '@/di/repositories/core/workspaces.repository.interface'
import { desc, eq } from 'drizzle-orm'
import { coreUsers, coreWorkspaces, coreWorkspacesUsers } from '../../../migrations/schema'
import { WorkspaceWithUserCount } from '../../../types'

export const WorkspacesRepository: IWorkspacesRepository = {
  findManyWorkspacesWithUserCount: async (input, options) => {
    const promise = options.db
      .select({
        workspace: coreWorkspaces,
        user: coreUsers,
      })
      .from(coreWorkspaces)
      .leftJoin(
        coreWorkspacesUsers,
        eq(coreWorkspacesUsers.workspaceId, coreWorkspaces.id)
      )
      .leftJoin(coreUsers, eq(coreWorkspacesUsers.userId, coreUsers.id))
      .where(input.where)
      .offset(input.offset ?? 0)
      .limit(input.limit ?? 10)
      .orderBy(input.orderBy ?? desc(coreWorkspaces.createdAt))

    const resolved = await promise
    const workspaceMap = new Map()

    resolved.forEach((row) => {
      const workspace = row.workspace
      if (!workspaceMap.has(workspace.id)) {
        workspaceMap.set(workspace.id, {
          workspace,
          userCount: row.user ? 1 : 0,
          seenUsers: new Set(row.user ? [row.user.id] : []),
        })
      } else {
        const entry = workspaceMap.get(workspace.id)
        if (row.user && !entry.seenUsers.has(row.user.id)) {
          entry.userCount++
          entry.seenUsers.add(row.user.id)
        }
      }
    })

    return Array.from(workspaceMap.values()).map(
      ({ workspace, userCount }) => ({
        workspace,
        userCount,
      })
    ) as WorkspaceWithUserCount[]
  },
}