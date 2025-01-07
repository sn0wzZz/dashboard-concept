import { SQL } from 'drizzle-orm'
import { ServiceOptions, WorkspaceWithUserCount } from '../../../../types'

export interface IWorkspacesService {
  getWorkspacesWithUserCount(
    params?: {
      filters?: SQL
      sort?: SQL
      page?: number
      pageSize?: number
    },
    options?: ServiceOptions
  ): Promise<WorkspaceWithUserCount[]>
}