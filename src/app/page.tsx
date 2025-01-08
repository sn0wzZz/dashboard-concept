'use cache'

import { StatsUsers } from '@/components/stats-users'
import { StatsWorkspaces } from '@/components/stats-workspaces'
import { trigani } from '@/di/service-container'
import { asc } from 'drizzle-orm'
import { coreUsers } from '../../migrations/schema'
import { Suspense } from 'react'
import Spinner from '@/components/spinner'

export default async function Home() {
  const [usersPromise, workspacesPromise] = [
    trigani.users.getUsersWithRoles({
      pageSize: 9999,
      sort: asc(coreUsers.createdAt), 
    }),
    trigani.workspaces.getWorkspacesWithUserCount({
      pageSize: 9999,
      sort: asc(coreUsers.createdAt),
    }),
  ]

  return (
    <div className='container mx-auto py-10 flex gap-10'>
      <Suspense fallback={<Spinner />}>
        <StatsUsers usersPromise={usersPromise} />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <StatsWorkspaces workspacesPromise={workspacesPromise} />
      </Suspense>
    </div>
  )
}
