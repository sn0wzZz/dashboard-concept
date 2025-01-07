import { SQL } from 'drizzle-orm'
import { ServiceOptions, WorkspaceWithUserCount } from '../../../../types'

export interface IWorkspacesRepository {
  findManyWorkspacesWithUserCount(
    input: {
      where?: SQL
      orderBy?: SQL
      limit?: number
      offset?: number
    },
    options: ServiceOptions
  ): Promise<WorkspaceWithUserCount[]>
}
