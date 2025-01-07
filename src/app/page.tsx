
import { db } from '@/lib/database/drizzle.client';
import { UsersRepository } from '@/services/users/users.repository';
import { UsersService } from '@/services/users/users.service';
import { asc  } from 'drizzle-orm';
import { coreUsers, } from '../../migrations/schema';
import { ServiceOptions } from '../../types';
import { StatsUsers } from '@/components/stats-users';
import { WorkspacesRepository } from '@/services/workspaces/workspaces.repository';
import { WorkspacesService } from '@/services/workspaces/workspaces.service';
import { StatsWorkspaces } from '@/components/stats-workspaces';

export default async function Home() {
  const defaultOptions: ServiceOptions = {
    db: db,
  }
  const trigani = {
    users: UsersService(UsersRepository, defaultOptions),
    workspaces: WorkspacesService(WorkspacesRepository, defaultOptions),
  }
  const users = await trigani.users.getUsersWithRoles({
    pageSize:9999,
    sort: asc(coreUsers.createdAt),
  })

  const workspaces = await trigani.workspaces.getWorkspacesWithUserCount({
    pageSize: 9999,
    sort: asc(coreUsers.createdAt),
  })
  
  console.log(workspaces)
  return (
    <div className='container mx-auto py-10 flex gap-10'>
      <StatsUsers users={users} />
      <StatsWorkspaces workspaces={workspaces} />
    </div>
  )
}
