'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { useState } from 'react'
import { UserWithRoles } from '../../../types'


const chartConfig = {
  premium: {
    label: 'Premium Users',
    color: 'hsl(var(--chart-1))',
  },
  regular: {
    label: 'Regular Users',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

export function StatsUsers({users} : {users:UserWithRoles[]}) {
  const [selectedDays, setSelectedDays] = useState('all')

  const filteredUsers = users.filter((user) => {
    if (selectedDays === 'all') return true
    const daysAgo =
      new Date().getTime() - new Date(user.users.createdAt!).getTime()
    const daysDiff = daysAgo / (1000 * 60 * 60 * 24)
    return daysDiff <= parseInt(selectedDays)
  })

  const usersByMonth = filteredUsers.reduce((acc, user) => {
    const date = new Date(user.users.createdAt!)
    const month = date.toLocaleString('default', { month: 'long' })
    const userType = user?.roles?.type === 'TENANT' ? 'premium' : 'regular'
    acc[month] = {
      ...acc[month],
      [userType]: (acc[month]?.[userType] || 0) + 1,
    }
    return acc
  }, {} as Record<string, { premium: number; regular: number }>)

  const chartData = Object.entries(usersByMonth).map(([month, count]) => ({
    month,
    premium: count.premium || 0,
    regular: count.regular || 0,
  }))

  console.log(chartData)

  return (
    <Card className='w-1/2'>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <CardTitle>Users by month</CardTitle>
            {/* <CardDescription>
              Showing total users for the last 12 months
            </CardDescription> */}
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
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 22,
              right: 22,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="premium"
              type="natural"
              fill="hsl(var(--chart-1))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1))"
              stackId="a"
            />
            <Area
              dataKey="regular"
              type="natural"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-2))"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </Card>
  )
}
