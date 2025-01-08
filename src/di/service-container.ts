import { db } from '@/lib/database/drizzle.client'
import { ServiceOptions } from '../../types'
import { UsersService } from '@/services/users/users.service'
import { WorkspacesService } from '@/services/workspaces/workspaces.service'
import { WorkspacesRepository } from '@/services/workspaces/workspaces.repository'
import { UsersRepository } from '@/services/users/users.repository'


export const defaultOptions: ServiceOptions = {
    db: db,
  }
  export const trigani = {
    users: UsersService(UsersRepository, defaultOptions),
    workspaces: WorkspacesService(WorkspacesRepository, defaultOptions),
  }