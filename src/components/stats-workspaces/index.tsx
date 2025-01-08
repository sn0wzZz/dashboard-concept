'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { use, useState } from 'react'

import { WorkspaceWithUserCount } from '../../../types'

const chartConfig = {
  users: {
    label: 'Users per Workspace',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function StatsWorkspaces({
  workspacesPromise,
}: {
  workspacesPromise: Promise<WorkspaceWithUserCount[]>
}) {
  const workspaces = use(workspacesPromise)
  const [selectedDays, setSelectedDays] = useState('all')

  const filteredWorkspaces = workspaces.filter((workspace) => {
    if (selectedDays === 'all') return true
    const daysAgo =
      new Date().getTime() -
      new Date(workspace?.workspace?.createdAt ?? '').getTime()
    const daysDiff = daysAgo / (1000 * 60 * 60 * 24)
    return daysDiff <= parseInt(selectedDays)
  })

  const chartData = filteredWorkspaces.map((workspace) => ({
    name: workspace.workspace.name,
    users: workspace.userCount,
  }))

  return (
    <Card className='w-1/2'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <CardTitle>Users per Workspace</CardTitle>
          </div>

          <Tabs defaultValue='all' onValueChange={setSelectedDays}>
            <TabsList>
              <TabsTrigger value='30'>30 days</TabsTrigger>
              <TabsTrigger value='60'>60 days</TabsTrigger>
              <TabsTrigger value='90'>90 days</TabsTrigger>
              <TabsTrigger value='all'>All time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <ChartContainer config={chartConfig}>
        <BarChart
          data={chartData}
          margin={{
            left: 22,
            right: 22,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='name'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <Tooltip />
          <Bar
            dataKey='users'
            fill='hsl(var(--chart-2))'
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
