import { db } from '@/lib/database/drizzle.client'
import { SelectCoreRolesSchema, SelectCoreUsersSchema, SelectCoreWorkspacesSchema } from '@/lib/database/models/zod-models'

export type ServiceOptions = {
  db: typeof db 
}

export interface UserWithRoles {
  users: SelectCoreUsersSchema
  roles: SelectCoreRolesSchema
}

export interface WorkspaceWithUserCount {
  workspace: SelectCoreWorkspacesSchema
  userCount: number
}